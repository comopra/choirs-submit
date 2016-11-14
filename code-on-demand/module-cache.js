function cache() {

    const cop = (window.CoP = window.CoP || {});
    return cop.moduleCache = cop.moduleCache || {};

}

function asSemVer(version) {

    const bits = version.split(".").map(x => parseInt(x));
    return {
        major: bits[0],
        minor: bits[1],
        patch: bits[2]
    };

}

function isAcceptable(req, avail) {

    // not ok with diff major
    if ( req.major !== avail.major ) { return false; }
    // ok with any bigger minor version
    if ( req.minor < avail.minor ) { return true; }
    // not ok with smaller minor version
    if ( req.minor > avail.minor ) { return false; }
    // not ok with smaller patch version
    if ( req.patch > avail.patch ) { return false; }
    // ok with same minor, bigger or equal patch
    return true;

}

function resolveVersion(keyCache, minVersion) {

    const requiredVersion = asSemVer(minVersion);
    const cachedVersions = Object.keys( keyCache );
    const acceptableVersion = cachedVersions.find( version => 
        isAcceptable( requiredVersion, asSemVer( version ) ) );
    return acceptableVersion ? keyCache[ acceptableVersion ] : null;

}

function retrieve(module) {

    try {

        const keyCache = cache()[module.key]
        if (!keyCache) { return null; }
        return resolveVersion(keyCache, module.version);

    }
    catch (e) {

        console.log("Error processing module cache versioning", e.stack);

    }
    return null;

}

function store(module) {

    throw new Error("Not implemented");

}
export {
    store,
    retrieve
};
