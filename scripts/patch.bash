new_version=$1 && cd plugin &&
pattern='s/^[^0-9]*(([0-9]+\.)*[0-9]+).*/\1/p'

patchPluginXml() {
    filename="plugin.xml" &&

    version_string=$(grep "<plugin id=\"cordova.plugin.yabbiads\"" $filename) &&
    version=$(sed -nre $pattern <<< "$version_string") &&

    search_string="<plugin id=\"cordova.plugin.yabbiads\" version=\"$version\"" &&
    replace_string="<plugin id=\"cordova.plugin.yabbiads\" version=\"$new_version\""  &&

    sed -i '' "s/$search_string/$replace_string/" $filename
}


patchPluginJs() {
    cd ./www
    filename="YabbiAdsPlugin.js" &&

    version_string=$(grep "const _VERSION = '$version';" $filename) &&
    version=$(sed -nre $pattern <<< "$version_string") &&

    search_string="const _VERSION = '$version';" &&
    replace_string="const _VERSION = '$new_version';"  &&

    sed -i '' "s/$search_string/$replace_string/" $filename &&
    cd ..
}

patchPluginXml && patchPluginJs && sudo npm version $new_version && npm publish

echo "All done."