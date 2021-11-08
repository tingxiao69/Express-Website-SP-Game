// function getKeyByValue(object, value) {
//     return Object.keys(object).find(key =>
//         object[key] === value);
// }
//
// var exampleObject = {
//     key1: 'Geeks',
//     key2: 100,
//     key3: 'Javascript'
// };
//
// ans = getKeyByValue(exampleObject, 'Geeks');
// console.log(ans);

categoryid = '1,17'
categoryid_list = categoryid.split(',').map(e => parseInt(e));
console.log(categoryid_list)

