const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const generateReport = async (req, res) => {
    try {
        // 1. Get data entered by the user
        const {
            topic,
            date,
            month,
            year,
            resourcepersonal,
            objectiveofevent,
            outcomeofevent,
            description,
            votethanks,
            participants,
        } = req.body;


        // 2. Location of your Word template
        const templatePath = path.join(
            __dirname,
            "../templates/backend/templates/report-template.docx.doc"
        );


        // 3. Check whether template exists
        if (!fs.existsSync(templatePath)) {
            return res
            .status(404)
            .json({
                success: false,
                message: "Word template not found"
            });
        }


        // 4. Read the Word template
        const content = fs.readFileSync(templatePath, "binary");


        // 5. Load the DOCX file
        const zip = new PizZip(content);


        // 6. Create Docxtemplater
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true
        });


        // 7. Replace placeholders in the template
        doc.render({
            topic,
            date,
            month,
            year,
            resourcepersonal,
            objectiveofevent,
            outcomeofevent,
            description,
            votethanks,
            participants,
        });


        // 8. Generate the final DOCX
        const buffer = doc.getZip().generate({
            type: "nodebuffer"
        });


        // 9. Create generated folder if it doesn't exist
        const generatedFolder = path.join(
            __dirname,
            "../generated"
        );

        if (!fs.existsSync(generatedFolder)) {
            fs.mkdirSync(generatedFolder, {
                recursive: true
            });
        }


        // 10. Create output file
        const outputPath = path.join(
            generatedFolder,
            "college-report.docx"
        );


        // 11. Save the generated document
        fs.writeFileSync(outputPath, buffer);


        // 12. Download the file to user's device
        res.download(
            outputPath,
            "college-report.docx",
            (error) => {
                if (error) {
                    console.error("Download error:", error);
                }
            }
        );

    } catch (error) {

        console.error("Report generation error:", error);

        res
        .status(500)
        .json({
            success: false,
            message: "Failed to generate report",
            error: error.message
        });
    }
};


module.exports = {
    generateReport
};