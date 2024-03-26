import { RequestHandler } from "express";
import { Amplify } from "aws-amplify";
import { AWS_API_CONFIG } from "../constants/constants";
import { generateClient } from "aws-amplify/api";
import { getInvoice,listInvoices } from "../graphql/queries";
import { Invoice} from "../awsApis";
import jwt from "jsonwebtoken";

Amplify.configure(AWS_API_CONFIG);
const client = generateClient();
