const projectsModel = require("../../models/projects.model");
const getPagination = require("../../services/query");

async function getAllProjects(req, res) {
  const { skip, limit } = getPagination(req.query);
  const projects = await projectsModel
    .find({ owner: req.user._id }, "-__v")
    .skip(skip)
    .limit(limit);

  return res.status(200).json(projects);
}

async function createProject(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(500).send({ message: "Please enter all the details" });
    }
    const project = new projectsModel({ ...req.body, owner: req.user._id });

    console.log(project);

    const create = await project.save();

    if (create) {
      res.status(200).json({ message: "Project created successfully!" });
    }
  } catch (error) {
    return res.json({ error: error });
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(500).send({ message: "Please enter all the details" });
    }

    const deleteProject = await projectsModel.deleteOne({ _id: id });

    if (deleteProject) {
      res.status(200).json({ message: "Project deleted successfully!" });
    }
  } catch (error) {
    return res.json({ error: error });
  }
}

async function updateProject() {
  // db.update ({'seraching criteria goes here ' },
  // {
  //  $set : {
  //           trk : [ {
  //                      "lat": 50.3293714,
  //                      "lng": 6.9389939
  //                   },
  //                   {
  //                      "lat": 50.3293284,
  //                      "lng": 6.9389634
  //                   }
  //                ]//'inserted Array containing the list of object'
  //       }
  // });

  // db.data.updateOne(

  //   // $elemMatch finds docs containing an array with a matching element
  //   {
  //     "trees": { "$elemMatch": { "poken": 5 }}
  //   },
  
  //   // Positional operator $ is a placeholder for the first matching array element
  //   {
  //     "$set": { "trees.$.poken": 7 }
  //   }
  // );
}

async function createProjectItem() {}

async function updateProjectItem() {
//   db.update({'Searching criteria goes here'},
// {
//  $push : {
//     trk :  {
//              "lat": 50.3293714,
//              "lng": 6.9389939
//            } //inserted data is the object to be inserted 
//   }
// });
}

async function deleteProjectItem() {}

module.exports = {
  getAllProjects,
  createProject,
  deleteProject,
  updateProject,
  createProject,
  createProjectItem,
  deleteProjectItem,
  updateProjectItem,
};
