import "../App.css";
import * as xlsx from "xlsx";

const Converter = ({ setData , getData}) => {

        const convertJsonToExcel = () => {

        // e.preventDefault()

        const workSheet = xlsx.utils.json_to_sheet(getData);
        const workBook = xlsx.utils.book_new();

        xlsx.utils.book_append_sheet(workBook, workSheet, "users")
        // Generate buffer
        xlsx.write(workBook, { bookType: 'xlsx', type: "buffer" })

        // Binary string
        xlsx.write(workBook, { bookType: "xlsx", type: "binary" })

        xlsx.writeFile(workBook, "download.xlsx")

    }

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                let newJson = json.map((row, i) => {
                    return {
                        login: `${row['Name'].toLowerCase()}_${row['Surname'].toLowerCase()}`,
                        name: row['Name'],
                        surName: row['Surname'],
                        fio: `${row['Name']} ${row['Surname']}`,
                        fname: row['Name']

                    }
                })
                setData(newJson)
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }
  
    return (
        <>
            <form className="dtForm" >
                {setData &&
                   <label htmlFor="upload">Click to upload a file</label>
                }
             {setData &&   <input
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={readUploadFile}
                />}
                {getData && <button className="tbButton" onClick={convertJsonToExcel} >
                    Download
                </button>}

            </form >

        </>
    )
}

export default Converter

