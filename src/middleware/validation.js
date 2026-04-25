const Joi = require('joi');

const validateClientForm = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    requirement: Joi.string().required().min(10).max(1000),
  });

  return schema.validate(data);
};

const validateProject = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().min(5),
    description: Joi.string().required().min(10),
    techStack: Joi.array().items(Joi.string()),
    liveUrl: Joi.string().uri().optional(),
    githubUrl: Joi.string().uri().optional(),
    featured: Joi.boolean().optional(),
  });

  return schema.validate(data);
};

const validateService = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    icon: Joi.string().optional(),
    order: Joi.number().optional(),
  });

  return schema.validate(data);
};

module.exports = {
  validateClientForm,
  validateProject,
  validateService,
};
