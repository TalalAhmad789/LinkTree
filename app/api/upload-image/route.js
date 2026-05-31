import { NextResponse } from "next/server";
import { databaseConnection } from "@/app/Connection/dbConnection";
import Link from "@/app/models/Link";
import { uploadImage } from "@/app/UserActions/actions";

export async function POST(req) {
  await databaseConnection();

  const formData = await req.formData();
  const image = formData.get("image");
  const email = formData.get("email");
  const handle = formData.get("handle");
  const description = formData.get("description");
  const id = formData.get("id");
  const links = formData.getAll("links");
  const updatedLinks = [];

  if (!handle || !description || links.length === 0) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  for (let index = 0; index < links.length; index++) {
    if (links[index].startsWith("https://")) {
      updatedLinks.push(links[index])
    }
    else {
      links[index] = "https://" + links[index];
      updatedLinks.push(links[index]);
    }
  }

  const imageData = await uploadImage(image, "linktree");

  const handleExist = await Link.findOne({ handle });
  if (handleExist) {
    return NextResponse.json({ error: "Handle already exists" }, { status: 400 });
  }

  const created = await Link.create({
    id,
    email,
    handle,
    Links: updatedLinks,
    description,
    public_id: imageData.public_id,
    image_url: imageData.secure_url
  });



  return NextResponse.json({
    message: "Link created",
    email
  }, { status: 201 });
}
