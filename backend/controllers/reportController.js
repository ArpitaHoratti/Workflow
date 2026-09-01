const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const ImageModule = require("docxtemplater-image");

const generateReport = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);
        // ==========================================
        // 1. GET TEXT DATA
        // ==========================================
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
            participants
        } = req.body;


        // ==========================================
        // 2. GET UPLOADED IMAGES
        // ==========================================

        const photo1 = req.files?.photo1?.[0];
        const photo2 = req.files?.photo2?.[0];
        const photo3 = req.files?.photo3?.[0];
        const photo4 = req.files?.photo4?.[0];
        // ==========================================
        // 3. TEMPLATE PATH
        // ==========================================
        const templatePath = path.join(
            __dirname,
            "../templates/report-template.docx"
        );
        

        // ==========================================
        // 4. CHECK TEMPLATE
        // ==========================================

        if (!fs.existsSync(templatePath)) {
            return res.status(404).json({
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
        // 7. IMAGE MODULE
        // ==========================================

        const imageOptions = {
         getImage(tagValue) {
             return fs.readFileSync(tagValue);
         },

         getSize() {
             return [300, 200];
             }
         };


        // ==========================================
        // 8. CREATE DOCXTEMPLATER
        // ==========================================

        const doc = new Docxtemplater(zip, {
             paragraphLoop: true,
             linebreaks: true,
             modules: [
                 new ImageModule(imageOptions)
                 ]
             });


        // ==========================================
        // 9. RENDER TEXT + IMAGES
        // ==========================================

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

         photo1: req.files?.photo1?.[0]?.path || "",
         photo2: req.files?.photo2?.[0]?.path || "",
         photo3: req.files?.photo3?.[0]?.path || "",
         photo4: req.files?.photo4?.[0]?.path || ""
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

        const outputPath = path.join(
            generatedFolder,
            "college-report.docx"
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
            "college-report.docx",
            (error) => {

                if (error) {

                    console.error(
                        "Download error:",
                        error
                    );

                }

            }
        );

    } catch (error) {

        console.error(
            "Report generation error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to generate report",

            error:
                error.message

        });

    }
};


module.exports = {
    generateReport
};