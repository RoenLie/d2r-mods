/**
 * Script to generate TypeScript types from mod.json config.
 * The mod.json is the source of truth - this just extracts type definitions.
 *
 * Usage: npx tsx generate_mod_json.ts
 */

import { readFileSync, writeFileSync } from 'node:fs';

interface ModJson {
	$schema?: string;
	name:     string;
	config:   ConfigItem[];
}

interface ConfigItem {
	id?:              string;
	type:             string;
	name:             string;
	description?:     string;
	defaultValue?:    any;
	options?:         { label: string; value: any; }[];
	children?:        ConfigItem[];
	visible?:         any;
	defaultExpanded?: boolean;
	minValue?:        number;
	maxValue?:        number;
}

// Read mod.json
const modJsonPath = './mod.json';
const modJson: ModJson = JSON.parse(readFileSync(modJsonPath, 'utf-8'));

// Extract all fields with IDs recursively
function extractFields(items: ConfigItem[]): ConfigItem[] {
	const fields: ConfigItem[] = [];
	for (const item of items) {
		if (item.type === 'section' && item.children)
			fields.push(...extractFields(item.children));

		else if (item.id)
			fields.push(item);
	}

	return fields;
}

const allFields = extractFields(modJson.config);

// Generate TypeScript interface
const lines: string[] = [
	'/* eslint-disable */',
	'/**',
	' * AUTO-GENERATED from mod.json',
	' * DO NOT EDIT MANUALLY - Run `node generate_mod_json.ts` to regenerate',
	' */',
	'',
	'export interface ModConfig {',
];

for (const field of allFields) {
	let typeStr: string;

	if (field.type === 'checkbox') {
		typeStr = 'boolean';
	}
	else if (field.type === 'select' && field.options) {
		const values = field.options.map(opt => {
			if (typeof opt.value === 'string')
				return `'${ opt.value }'`;

			return String(opt.value);
		});
		typeStr = values.join(' | ');
	}
	else if (field.type === 'string') {
		typeStr = 'string';
	}
	else if (field.type === 'number') {
		typeStr = 'number';
	}
	else {
		typeStr = 'any';
	}

	// Mark as optional if no defaultValue is set
	const optional = field.defaultValue === undefined ? '?' : '';

	// Add JSDoc with default value
	if (field.defaultValue !== undefined) {
		const defaultStr = typeof field.defaultValue === 'string'
			? `'${ field.defaultValue }'`
			: String(field.defaultValue);
		lines.push(`\t/** @default ${ defaultStr } */`);
	}

	lines.push(`\t${ field.id }${ optional }: ${ typeStr };`);
}

lines.push('}');

const generatedTypes = lines.join('\n');

// Write TypeScript types
const typesPath = './src/generated_types.ts';
writeFileSync(typesPath, generatedTypes);

console.log('✅ TypeScript types generated!');
console.log(`📝 Written to ${ typesPath }`);
console.log(`📊 Generated ${ allFields.length } config fields`);
