function reformat(json) {
    index = []
    duplicateItemIndex = []
    json.forEach(
        i => index.push(i.gameid)
    )
// find all the unique gameid
    var uniqueIndex = [...new Set(index)]
    console.log(uniqueIndex)

// find the gameid of the games which have multiple category id
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
    duplicateItemIndex = [...new Set(findDuplicates(index))]


// find the game index that has multiple categories
    duplicateIndices = []
    for (let t = 0; t < duplicateItemIndex.length; t++) {
        var indices = [];
        for (let i = 0; i < json.length; i++) {
            if (json[i].gameid == duplicateItemIndex[t]) {
                indices.push(i);
            }
        }
        duplicateIndices.push(indices)
    }


//find the games index only have 1 category
    var singleIndex = uniqueIndex.filter(x => duplicateItemIndex.indexOf(x) === -1);
    singleIndices = []
    for (let t = 0; t < singleIndex.length; t++) {
        for (let i = 0; i < json.length; i++) {
            if (json[i].gameid == singleIndex[t]) {
                singleIndices.push(i);
            }

        }
    }


// Prepare for the output
    output = []
// loop according to the duplicateIndices array
    for (let i = 0; i < duplicateIndices.length; i++) {
        categoryid = []
        catname=[]
        for (let t = 0; t < duplicateIndices[i].length; t++) {
            dupInd = duplicateIndices[i][t]
            // concat the category id
            categoryid.push(json[dupInd].categoryid)
            catname.push(json[dupInd].catname)
        }
        output.push(
            {
                "gameid": json[dupInd].gameid,
                "title": json[dupInd].title,
                "description": json[dupInd].description,
                "price": json[dupInd].price,
                "platform": json[dupInd].platform,
                "categoryid": categoryid,
                "catname": catname,
                "year": json[dupInd].year,
                "created_at": json[dupInd].created_at
            }
        )
    }
// loop according to the singleIndices array
    for (let i = 0; i < singleIndices.length; i++) {
        sinInd = singleIndices[i]
        output.push(
            json[sinInd]
        )
    }

    console.log(output)
    return output
}

module.exports = reformat


