import { NextRequest, NextResponse } from "next/server";
import { configuratorFormSchema } from "@/lib/validations/configurator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = configuratorFormSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validatedData.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    // Log the submission (in production, save to database)
    console.log("=".repeat(50));
    console.log("NEW TRAILER CONFIGURATION SUBMITTED");
    console.log("=".repeat(50));
    console.log("Configuration:", JSON.stringify(validatedData.data, null, 2));
    console.log("=".repeat(50));

    // In production, you would save to your database here:
    // const configuration = await prisma.trailerConfiguration.create({
    //   data: {
    //     ...validatedData.data,
    //     status: "submitted",
    //   },
    // });

    // Simulate some processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In production, you might also:
    // - Send email notification to admin
    // - Send confirmation email to customer
    // - Create a CRM entry
    // - Trigger webhook notifications

    return NextResponse.json({
      success: true,
      message: "Configuration submitted successfully",
      // In production, return the saved configuration ID
      // id: configuration.id,
    });
  } catch (error) {
    console.error("Error submitting configuration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
