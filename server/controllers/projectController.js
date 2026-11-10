
import Project from '../models/Project.js';

// GET all projects
export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({
    order: 1,
    createdAt: -1
  });

  res.json(projects);
};

// GET one project by slug
export const getProjectBySlug = async (req, res) => {
  const project = await Project.findOne({
    slug: req.params.slug
  });

  if (!project) {
    return res.status(404).json({
      message: 'Project not found'
    });
  }

  res.json(project);
};

// CREATE a project
export const createProject = async (req, res) => {
  const project = await Project.create(req.body);

  res.status(201).json(project);
};

// UPDATE a project
export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!project) {
    return res.status(404).json({
      message: 'Project not found'
    });
  }

  res.json(project);
};

// DELETE a project
export const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(
    req.params.id
  );

  if (!project) {
    return res.status(404).json({
      message: 'Project not found'
    });
  }

  res.json({ message: 'Deleted' });
};
