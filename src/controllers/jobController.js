import db, { sequelize } from '../models/index';
import { StatusCodes } from 'http-status-codes';

import { NotFoundErr } from '../utils/customErrors';
import { Op } from 'sequelize';
import { JOB_SORT_BY } from '../utils/constant';

//let jobs = [];

// getall job
const getJobPagination = async (page = 1, limit = 10, search) => {
  const offset = (page - 1) * limit;
  const { where, order } = search;
  console.log(order);
  //remove properties cannot input
  Object.keys(where).map((key) => where[key] === 'all' && delete where[key]);

  const result = await db.Job.findAndCountAll({
    where,
    include: {
      model: db.User,
      required: true,
      attributes: ['firstName', 'lastName'],
    },
    order,
    offset,
    limit,
  });
  if (!result) throw NotFoundErr('no job found');
  const totalPage = Math.ceil(result.count / limit);
  const data = {
    count: result.count,
    jobs: result.rows,
    totalPage,
    currentPage: +page,
  };
  return data;
};

export const getAllJob1 = async (req, res) => {
  const { page, limit } = req.query;
  const search = {
    where: { createdBy: req.user.id },
    order: [['createdAt', 'DESC']],
  };
  const data = await getJobPagination(page, limit, search);
  // const offset = (page - 1) * limit;
  // const result = await db.Job.findAndCountAll(
  //   { where: { createdBy: req.user.id } },
  //   offset,
  //   limit
  // );
  // if (!result.rows) throw new NotFoundErr('No job found');
  // const totalPage = Math.ceil(result.count / limit);
  // const data = { count: result.count, users: result.rows, totalPage };

  res.status(StatusCodes.OK).json(data);
};

export const getAllJob = async (req, res) => {
  const { position, jobStatus, jobType, page, limit, sort } = req.query;
  console.log('-------------------------------');
  console.log('check position', position);
  console.log('-------------------------------');
  let order = [];
  switch (sort) {
    case JOB_SORT_BY.NEWEST:

    case JOB_SORT_BY.OLDEST:
      order = ['createdAt', 'ASC'];
      break;
    case JOB_SORT_BY.ASCENDING:
      order = ['id', 'ASC'];
      break;
    case JOB_SORT_BY.DESCENDING:
      order = ['id', 'DESC'];
      break;
    default:
      order = ['createdAt', 'DESC'];
      break;
  }

  const search = {
    where: {
      createdBy: req.user.id,
      position: position ? { [Op.like]: `%${position}%` } : 'all',
      jobStatus: jobStatus || 'all',
      jobType: jobType || 'all',
    },
    order: [order],
  };

  const data = await getJobPagination(page, limit, search);

  res.status(StatusCodes.OK).json(data);
};
export const showStats = async (req, res) => {
  let stats = await db.Job.findAll({
    where: { createdBy: req.user.id },
    attributes: [
      'jobStatus',
      [sequelize.cast(sequelize.fn('count', 'jobStatus'), 'decimal'), 'count'],
    ],
    group: ['jobStatus'],
    raw: true,
  });

  stats = stats.reduce((acc, current) => {
    const { jobStatus, count } = current;

    acc[jobStatus] = count;

    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    decline: stats.declined || 0,
  };
  let monthlyApplication = [
    {
      date: 'May 23',
      count: 12,
    },
    {
      date: 'Jun 23',
      count: 10,
    },
    {
      date: 'Jul 24',
      count: 21,
    },
    {
      date: 'Aug 22',
      count: 17,
    },
  ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplication, stats });
};
// create job
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const { email } = req.user;
  const userFound = await db.User.findOne({ where: { email: email } });
  if (!userFound) throw new NotFoundErr('User not found');

  if (!company) {
    return res.status(500).json({ msg: 'Company cannot empty' });
  }

  const job = await db.Job.create({
    company,
    position,
    createdBy: userFound.id,
  });
  res.status(StatusCodes.CREATED).json({ job });
};

//get single job
export const getSingleJob = async (req, res) => {
  const { id } = req.params;

  const job = await db.Job.findOne({ where: { id: id }, raw: false });

  if (!job) throw new NotFoundErr(`no job with id ${id}`);

  res.status(200).json({ msg: 'job find success', job });
};

// edit job
export const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = await db.Job.findOne({ where: { id: id }, raw: false });
  if (!job) throw new NotFoundErr(`no job with id ${id}`);

  const { company, position } = req.body;
  job.set({
    company: company,
    position: position,
  });

  await job.save();

  await job.reload();

  res.status(200).json({ msg: 'job update successfull', job });
};

//delete job
export const deleteJob = (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) throw new NotFoundErr(`no job with id ${id}`);
  const newJobs = jobs.filter((job) => job.id !== id);
  console.log(newJobs);
  jobs = newJobs;
  res.status(200).json({ msg: 'delete job success' });
};
