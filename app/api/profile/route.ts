import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { clerkId } = new URL(req.url).searchParams;
  const data = await req.json();

  try {
    const response = await fetch(
      `localhost:4000/api/profiles/modify?clerkId=${clerkId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const updatedProfile = await response.json();
    return NextResponse.json(updatedProfile);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
