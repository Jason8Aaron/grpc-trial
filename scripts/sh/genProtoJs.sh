protosRoot=protos
protosTsRoot=protosTs

sources=`du $protosRoot  | awk '{print $2}' | xargs`
echo $sources

for source in ${sources[@]}
do
    dest=`echo $source | sed s/${protosRoot}/${protosTsRoot}/`
    mkdir -p $dest
    protos=`ls ${source}/ | grep .proto`
    for proto in ${protos[@]}
    do
        jsFile=`echo $proto | sed s/.proto/.js/`
        npx pbjs -t static --es6 --no-comments -w es6 ${source}/${proto} -o ${dest}/${jsFile}
        tsFile=`echo $proto | sed s/.proto/.d.ts/`
        npx pbts --no-comments -o ${dest}/${tsFile} ${dest}/${jsFile}
    done
done