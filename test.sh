#! /bin/bash
PackageInfo=`npm run packageInfo | awk 'END{print}'`;
Image="registry.cn-hangzhou.aliyuncs.com/dmy_mirror/$PackageInfo"
echo $Image
