const userArray = [];
var lastuserid = 0;



function checkUserExist(req, res, next) {
  var userid = req.params.id;
  var userexist = userArray.findIndex(item => item.id === userid);
  if (userexist > -1) {
    return res.status(409).send("user already exist");
  }
  next();
}

function checkUserpresence(req, res, next) {
  var userid = req.params.id;
  var userexist = userArray.findIndex(item => item.id === userid);
  if (userexist == -1) {
    return res.status(404).send("user not found");
  }
  next();
}

function getIndex(id) {
  return userArray.findIndex(item => item.id == id);
}


function getUser(req, res, next) {
  res.send(200, userArray);
}


function addUser(req, res, next) {
  var userid = req.params.id;
  console.log(userid);
  const user = req.body;
  user.id = (++lastuserid).toString();
  userArray.push(user);
  res.send(200, "user registred");
  res.end();
}

function updateUser(req, res, next) {

  var userid = req.params.id;
  const user = req.body;
  delete userArray.id;
  console.log(userArray);
  userArray[getIndex(userid)] = {
    ...user,
    id: userid
  };
  res.send(200, "data updated");
  res.end();

}

function deleteUser(req, res, next) {
  let userid = req.params.id;
  userArray.splice(getIndex(userid), 1);
  res.status(200).send("user deleted");
  res.end();
}
module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  checkUserExist,
  checkUserpresence
};