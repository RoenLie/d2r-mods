#!/usr/bin/env node

import { createHash } from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';


interface FileInfo {
	relativePath: string;
	size:         number;
	hash:         string;
}

interface ComparisonResult {
	file:       string;
	oldSize:    number | null;
	newSize:    number | null;
	sizeDiff:   number | null;
	sizeMatch:  boolean;
	bytesMatch: boolean;
	oldHash:    string | null;
	newHash:    string | null;
	oldPath?:   string;
	newPath?:   string;
}

function getFileHash(filePath: string): string {
	const fileBuffer = fs.readFileSync(filePath);
	const hashSum = createHash('sha256');
	hashSum.update(fileBuffer);

	return hashSum.digest('hex');
}

function getAllFiles(dir: string, baseDir: string = dir): FileInfo[] {
	const files: FileInfo[] = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...getAllFiles(fullPath, baseDir));
		}
		else if (entry.isFile()) {
			const relativePath = path.relative(baseDir, fullPath);
			const stats = fs.statSync(fullPath);
			const hash = getFileHash(fullPath);

			files.push({
				relativePath,
				size: stats.size,
				hash: hash,
			});
		}
	}

	return files;
}

function compareDirs(oldDir: string, newDir: string): ComparisonResult[] {
	if (!fs.existsSync(oldDir)) {
		console.error(`❌ Old directory does not exist: ${ oldDir }`);
		process.exit(1);
	}

	if (!fs.existsSync(newDir)) {
		console.error(`❌ New directory does not exist: ${ newDir }`);
		process.exit(1);
	}

	console.log('📁 Scanning directories...\n');

	const oldFiles = getAllFiles(oldDir);
	const newFiles = getAllFiles(newDir);

	console.log(`Old directory: ${ oldDir }`);
	console.log(`  Files: ${ oldFiles.length }`);
	console.log(`New directory: ${ newDir }`);
	console.log(`  Files: ${ newFiles.length }\n`);

	// Create maps for quick lookup
	const oldFilesMap = new Map(oldFiles.map(f => [ f.relativePath, f ]));
	const newFilesMap = new Map(newFiles.map(f => [ f.relativePath, f ]));

	// Get all unique file paths
	const allPaths = new Set([
		...oldFiles.map(f => f.relativePath),
		...newFiles.map(f => f.relativePath),
	]);

	const results: ComparisonResult[] = [];

	for (const filePath of Array.from(allPaths).sort()) {
		const oldFile = oldFilesMap.get(filePath);
		const newFile = newFilesMap.get(filePath);

		const result: ComparisonResult = {
			file:       filePath,
			oldSize:    oldFile?.size ?? null,
			newSize:    newFile?.size ?? null,
			sizeDiff:   oldFile && newFile ? newFile.size - oldFile.size : null,
			sizeMatch:  oldFile?.size === newFile?.size,
			bytesMatch: oldFile?.hash === newFile?.hash,
			oldHash:    oldFile?.hash ?? null,
			newHash:    newFile?.hash ?? null,
			oldPath:    oldFile ? path.join(oldDir, filePath) : undefined,
			newPath:    newFile ? path.join(newDir, filePath) : undefined,
		};

		results.push(result);
	}

	return results;
}

function formatBytes(bytes: number | null): string {
	if (bytes === null)
		return 'MISSING';
	if (bytes === 0)
		return '0 B';

	const k = 1024;
	const sizes = [ 'B', 'KB', 'MB', 'GB' ];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${ (bytes / Math.pow(k, i)).toFixed(2) } ${ sizes[i] }`;
}

function showDetailedDiff(oldPath: string, newPath: string, fileName: string) {
	console.log('\n┌' + '─'.repeat(77) + '┐');
	console.log(`│ 📄 ${ fileName.padEnd(73) }│`);
	console.log('└' + '─'.repeat(77) + '┘');

	const oldRaw = fs.readFileSync(oldPath, 'utf8');
	const newRaw = fs.readFileSync(newPath, 'utf8');

	// Find first difference
	let firstDiffIndex = -1;
	let line = 1;
	let col = 1;

	for (let i = 0; i < Math.max(oldRaw.length, newRaw.length); i++) {
		if (oldRaw[i] !== newRaw[i]) {
			firstDiffIndex = i;
			break;
		}
		if (oldRaw[i] === '\n') {
			line++;
			col = 1;
		}
		else {
			col++;
		}
	}

	if (firstDiffIndex === -1) {
		console.log('\n✓ Files are identical\n');

		return;
	}

	// Calculate diff range
	const sizeDiff = newRaw.length - oldRaw.length;

	console.log(`\n📍 First difference:`);
	console.log(`   Line: ${ line }`);
	console.log(`   Column: ${ col }`);
	console.log(`   Byte offset: ${ firstDiffIndex }`);
	console.log(`\n📏 Size difference: ${ sizeDiff > 0 ? '+' : '' }${ sizeDiff } bytes`);
	console.log(`   Old file: ${ oldRaw.length } bytes`);
	console.log(`   New file: ${ newRaw.length } bytes`);

	// Show a snippet of what changed
	const contextLen = 50;
	const oldSnippet = oldRaw.substring(firstDiffIndex, firstDiffIndex + contextLen);
	const newSnippet = newRaw.substring(firstDiffIndex, firstDiffIndex + contextLen);

	console.log(`\n📝 Context at difference:`);
	console.log(`   OLD: ${ JSON.stringify(oldSnippet) }${ oldRaw.length > firstDiffIndex + contextLen ? '...' : '' }`);
	console.log(`   NEW: ${ JSON.stringify(newSnippet) }${ newRaw.length > firstDiffIndex + contextLen ? '...' : '' }`);
	console.log();
}

function printResults(results: ComparisonResult[], showDiff: boolean = false) {
	console.log('═══════════════════════════════════════════════════════════════════════════════');
	console.log('                         FILE COMPARISON REPORT                                ');
	console.log('═══════════════════════════════════════════════════════════════════════════════\n');

	const missingInNew = results.filter(r => r.newSize === null);
	const missingInOld = results.filter(r => r.oldSize === null);
	const sizeMismatches = results.filter(r => r.oldSize !== null && r.newSize !== null && !r.sizeMatch);
	const byteMismatches = results.filter(r => r.oldSize !== null && r.newSize !== null && r.sizeMatch && !r.bytesMatch);
	const identical = results.filter(r => r.bytesMatch);

	// Summary
	console.log('📊 SUMMARY');
	console.log('─'.repeat(79));
	console.log(`Total files compared:     ${ results.length }`);
	console.log(`✓ Identical (bytes):      ${ identical.length }`);
	console.log(`✗ Size mismatches:        ${ sizeMismatches.length }`);
	console.log(`⚠ Same size, diff bytes:  ${ byteMismatches.length }`);
	console.log(`⊖ Missing in NEW:         ${ missingInNew.length }`);
	console.log(`⊕ Missing in OLD:         ${ missingInOld.length }\n`);

	// Missing files
	if (missingInNew.length > 0) {
		console.log('⊖ MISSING IN NEW DIRECTORY:');
		console.log('─'.repeat(79));
		for (const result of missingInNew)
			console.log(`  ${ result.file } (${ formatBytes(result.oldSize) })`);

		console.log();
	}

	if (missingInOld.length > 0) {
		console.log('⊕ MISSING IN OLD DIRECTORY:');
		console.log('─'.repeat(79));
		for (const result of missingInOld)
			console.log(`  ${ result.file } (${ formatBytes(result.newSize) })`);

		console.log();
	}

	// Size mismatches
	if (sizeMismatches.length > 0) {
		console.log('✗ SIZE MISMATCHES:');
		console.log('─'.repeat(79));
		for (const result of sizeMismatches) {
			const diff = result.sizeDiff!;
			const diffStr = diff > 0 ? `+${ formatBytes(diff) }` : formatBytes(diff);
			console.log(`  ${ result.file }`);
			console.log(`    Old: ${ formatBytes(result.oldSize) } | New: ${ formatBytes(result.newSize) } | Diff: ${ diffStr }`);

			if (showDiff && result.oldPath && result.newPath)
				showDetailedDiff(result.oldPath, result.newPath, result.file);
		}
		console.log();
	}

	// Byte mismatches (same size but different content)
	if (byteMismatches.length > 0) {
		console.log('⚠ SAME SIZE BUT DIFFERENT BYTES:');
		console.log('─'.repeat(79));
		for (const result of byteMismatches) {
			console.log(`  ${ result.file } (${ formatBytes(result.oldSize) })`);
			console.log(`    Old hash: ${ result.oldHash }`);
			console.log(`    New hash: ${ result.newHash }`);

			if (showDiff && result.oldPath && result.newPath)
				showDetailedDiff(result.oldPath, result.newPath, result.file);
		}
		console.log();
	}

	// Final verdict
	console.log('═══════════════════════════════════════════════════════════════════════════════');
	if (identical.length === results.length && results.length > 0)
		console.log('✅ ALL FILES ARE IDENTICAL! 🎉');

	else
		console.log('❌ DIFFERENCES DETECTED!');

	console.log('═══════════════════════════════════════════════════════════════════════════════\n');
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 2) {
	console.log('Usage: node compare-dirs.ts <old-dir> <new-dir> [--diff]');
	console.log('');
	console.log('Options:');
	console.log('  --diff    Show detailed diff for files with differences');
	console.log('');
	console.log('Example:');
	console.log('  node compare-dirs.ts ./test_output/old ./test_output/new');
	console.log('  node compare-dirs.ts ./test_output/old ./test_output/new --diff');
	process.exit(1);
}

const showDiff = args.includes('--diff');
const dirs = args.filter(arg => !arg.startsWith('--'));
const [ oldDir, newDir ] = dirs;

const results = compareDirs(oldDir, newDir);
printResults(results, showDiff);

// Exit with error code if differences found
const allIdentical = results.every(r => r.bytesMatch);
process.exit(allIdentical ? 0 : 1);
