const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const generateCollegeformat = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        // ==========================================
        // 1. GET TEXT DATA
        // ==========================================
        const {
            topic,
            date,
            time_and_duration,
            organized_for,
            objective,
            resource_person,
            faculty_coordinator,
            hospitality_manager,
            introduction_person,
            votethanks_by,
            media_manager,
            feedback_manager,
            praticipents
        } = req.body;

        // ==========================================
        // 3. TEMPLATE PATH
        // ==========================================
        const templatePath = path.join(
            __dirname,
            "../templates/college-format-template.docx"
        );
        

        // ==========================================
        // 4. CHECK TEMPLATE
        // ==========================================

        if (!fs.existsSync(templatePath)) {
            return res
            .status(404)
            .json({
                success: false,
                message: "Word template not found"
            });
        }


        // ==========================================
        // 5. READ TEMPLATE
        // ==========================================

        const content = fs.readFileSync(
            templatePath,
            "binary"
        );


        // ==========================================
        // 6. LOAD DOCX
        // ==========================================

        const zip = new PizZip(content);

        // ==========================================
        // 8. CREATE DOCXTEMPLATER
        // ==========================================

        const doc = new Docxtemplater(zip, {
             paragraphLoop: true,
             linebreaks: true,
        });

        // ==========================================
        // 9. RENDER TEXT
        // ==========================================

        doc.render({
          topic,
          date,
          time_and_duration,
          organized_for,
          objective,
          resource_person,
          faculty_coordinator,
          hospitality_manager,
          introduction_person,
          votethanks_by,
          media_manager,
          feedback_manager,
          praticipents
        });


        // ==========================================
        // 10. GENERATE DOCX BUFFER
        // ==========================================

        const buffer = doc.getZip().generate({
            type: "nodebuffer"
        });


        // ==========================================
        // 11. GENERATED FOLDER
        // ==========================================

        const generatedFolder = path.join(
            __dirname,
            "../generated"
        );

        if (!fs.existsSync(generatedFolder)) {

            fs.mkdirSync(
                generatedFolder,
                {
                    recursive: true
                }
            );

        }


        // ==========================================
        // 12. OUTPUT FILE
        // ==========================================

        const fileName = `college-format-${Date.now()}.docx`;

        const outputPath = path.join(
           generatedFolder,
           fileName
        );


        // ==========================================
        // 13. SAVE GENERATED REPORT
        // ==========================================

        fs.writeFileSync(
            outputPath,
            buffer
        );


        // ==========================================
        // 14. DOWNLOAD REPORT
        // ==========================================

        res.download(
           outputPath,
           "college-format.docx",
        (error) => {
             if (error) {
             console.error("Download error:", error);
             }
        }
        );

    } catch (error) {

    console.error("college format generation error:");
    console.error(error);

    //To Show detailed Docxtemplater errors
    if (error.properties && error.properties.errors) {

        error.properties.errors.forEach((err, index) => {
            console.error(`\nError ${index + 1}:`);
            console.error(err);
        });

    }

    return res
    .status(500)
    .json({
        success: false,
        message: "Failed to generate college format",
        error: error.message,
        details: error.properties || null
        });
    }
};

module.exports = {generateCollegeformat};