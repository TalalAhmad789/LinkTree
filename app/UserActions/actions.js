"use server"

import { databaseConnection } from "../Connection/dbConnection";
import User from "../models/User";
import cloudinary from "../lib/cloudinary";
import Link from "../models/Link";

export const fetchUser = async (EMAIL) => {
    await databaseConnection();
    const u = await User.findOne({ email: EMAIL });
    if (!u) {
        return null;
    }
    const user = u.toObject({ flattenObjectIds: true });
    return user;
}

export const fetchUsername = async (Name) => {
    await databaseConnection();
    const u = await User.findOne({ username: Name });
    if (!u) {
        return null;
    }
    const user = u.toObject({ flattenObjectIds: true });
    return user;
}

export const uploadImage = async (file, folder) => {

    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: "auto",
            folder: folder
        }, async (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        }).end(bytes);
    })
}

export const fetchLinks = async (Email) => {
    await databaseConnection();
    const linkFetch = await Link.find({ email: Email });
    if (!linkFetch) {
        return null;
    }
    const links = linkFetch.map(password => password.toObject({ flattenObjectIds: true }));
    return links;
}

export const fetchUrlLink = async (Id) => {
    await databaseConnection();
    const linkFetch = await Link.findOne({ id: Id });
    if (!linkFetch) {
        return null;
    }
    const link = linkFetch.toObject({ flattenObjectIds: true });
    return link;
}

export const deleteImage = async (ID, public_Id) => {
    await databaseConnection();
    const link = await Link.deleteOne({ id: ID });
    return new Promise(async (resolve, reject) => {
        try {
            const result = await cloudinary.uploader.destroy(public_Id);
            return resolve(result);
        } catch (error) {
            reject(new Error(error.message))
        }
    })
}


