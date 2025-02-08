import ApiError from "../Utility/ApiError.js";
import ApiResponse from "../Utility/ApiResponse.js";
import prisma from "../DB/Database.js";

const uploadProject = async (req, res) => {
  const { title, description, language, framework, githubUrl } = req.body;

  const userId = req.user?.id;

  if (!title || !description || !framework || !language || !githubUrl) {
    throw new ApiError(404, "All field are Required");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const project = await prisma.project.create({
    data: {
      title,
      description,
      language,
      framework,
      githubUrl,
      userId,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Tweet Created Succesfully"));
};

const allProject = async (req, res) => {
  try {
    const project = await prisma.project.findMany({
      include: {
        uploadedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!project) {
      throw new ApiError(400, {}, "No Project found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, project, "All Project fetched successfully"));
  } catch (error) {
    console.log(error);

    return res.status(400).json(new ApiError(400, error));
  }
};

const updateProject = async (req, res) => {
  const projectId = req.params.projectId;

  const userId = req.user?.id;

  const { title, description, githubUrl } = req.body;
  if (!(title || description || githubUrl)) {
    throw new ApiError(404, "All field are Required");
  }
  const existproject = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!existproject) {
    throw new ApiError(400, "Project not found");
  }
  if (existproject.userId !== userId) {
    throw new ApiError(
      403,
      "You do not have permission to Update this Project"
    );
  }
  const updateFields = {};
  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (githubUrl) updateFields.githubUrl = githubUrl;
  const updatedproject = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: updateFields,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedproject,
        "Project details updated successfully"
      )
    );
};

const projectDetails = async (req, res) => {
  
  const projectId = req.params.projectId;
  const existproject = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      uploadedBy: true,
    },
  });
  if (!existproject) {
    throw new ApiError(400, "Project not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, existproject, "Project Details fetched successfully")
    );
};

const deleteProject = async (req, res) => {};
const downloadProject = async (req, res) => {};

const downloadCount = async (req, res) => {};

export {
  uploadProject,
  allProject,
  updateProject,
  deleteProject,
  projectDetails,
  downloadProject,
  downloadCount,
};
