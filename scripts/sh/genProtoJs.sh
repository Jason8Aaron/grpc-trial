protosRoot=protos
protosTsRoot=protosTs

sources=`du $protosRoot  | awk '{print $2}' | xargs`

for source in ${sources[@]}
do
    dest=`echo $source | sed s/${protosRoot}/${protosTsRoot}/`
    mkdir -p $dest
    protos=`ls ${source}/ | grep .proto`
    for proto in ${protos[@]}
    do
        jsFile=`echo $proto | sed s/.proto/.js/`
        node_modules/.bin/pbjs -t static --es6  -w es6 ${source}/${proto} -o ${dest}/${jsFile}
        tsFile=`echo $proto | sed s/.proto/.d.ts/`
        node_modules/.bin/pbts --no-comments -o ${dest}/${tsFile} ${dest}/${jsFile}
        echo Converting ${proto} to ${jsFile} and ${tsFile}
    done
done