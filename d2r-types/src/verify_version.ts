export function verifyD2RMMVersion(requiredVersion: [number, number, number]): void {
	const requiredD2rmmVersion = requiredVersion;
	const currentVersion = D2RMM.getFullVersion();
	const errorMsg = `Requires D2RMM version ${ requiredD2rmmVersion.join('.') } or higher.`;

	if (currentVersion == null)
		throw new Error(errorMsg);

	// Ensure version array has enough elements
	if (currentVersion.length < requiredD2rmmVersion.length)
		throw new Error(errorMsg);

	// Compare each version component
	for (let i = 0; i < requiredD2rmmVersion.length; i++) {
		if (currentVersion[i] < requiredD2rmmVersion[i])
			throw new Error(errorMsg);
		else if (currentVersion[i] > requiredD2rmmVersion[i])
			break; // Higher version is OK
			// If equal, continue to next component
	}
}
