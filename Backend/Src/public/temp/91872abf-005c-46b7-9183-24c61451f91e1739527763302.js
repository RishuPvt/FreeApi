import ApiError from "../Utility/ApiError.js";
import ApiResponse from "../Utility/ApiResponse.js";
import prisma from "../DB/Database.js";
import { uploadOnCloudinary } from "../Utility/Cloudinary.js";

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

  
  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "No files uploaded");
  }
  
  const fileUrls = [];
  for (const file of req.files) {
    console.log("Uploading File Path:", file.path); // Debugging line
    const cloudinaryResponse = await uploadOnCloudinary(file.path);
  
    if (cloudinaryResponse && cloudinaryResponse.secure_url) {
      fileUrls.push(cloudinaryResponse.secure_url);
    } else {
      throw new ApiError(500, "Failed to upload files to Cloudinary");
    }
  }
  console.log("Uploaded Files URLs:", fileUrls);
  

  const project = await prisma.project.create({
    data: {
      title,
      description,
      language,
      framework,
      githubUrl,
      userId,
      fileUrl: fileUrls,
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

const deleteProject = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.user?.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new ApiError(400, "User Not Found");
  }
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (project.userId != userId) {
    throw new ApiError(400, "You are not have auth to delete this project");
  }

  const Deleteproject = await prisma.project.delete({
    where: {
      id: projectId,
    },
  });
  if (!project) {
    throw new ApiError(400, "Error While deleting");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Project deleted sucssesfully"));
};

const downloadProject = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      throw new ApiError(400, "Project not found");
    }

    if (!project.fileUrl) {
      throw new ApiError(400, "File URL not found for this project");
    }

    await prisma.project.update({
      where: { id: projectId },
      data: { downloadCount: project.downloadCount + 1 },
    });

    return res.status(200).json(new ApiResponse(200,project, "download fetched"));
  } catch (error) {
    console.error("Error downloading project:", error);
    throw new ApiError(400, "Error downloading project");
  }
};

const getDownloadCount = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { downloadCount: true },
    });

    if (!project) {
      throw new ApiError(400, "Project not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { downloadCount: project.downloadCount },
          "project count fetched succesfully"
        )
      );
  } catch (error) {
    console.error("Error fetching download count:", error);
    return res
      .status(400)
      .json(new ApiResponse(400, "Error fetching download count"));
  }
};

export {
  uploadProject,
  allProject,
  updateProject,
  deleteProject,
  projectDetails,
  downloadProject,
  getDownloadCount,
};
