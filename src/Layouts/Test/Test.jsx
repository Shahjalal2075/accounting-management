import ExcelJS from 'exceljs';

const Test = () => {

    const jsonData = [
        { Name: 'John', Age: 30 },
        { Name: 'Jane', Age: 25 },
        { Name: 'Doe', Age: 35 }
    ];

    const handleExport = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Excel Sheet");
        sheet.columns = [
            {
                header: "Name",
                key: "name",
                width: 10
            },
            {
                header: "Age",
                key: "age",
                width: 10
            },
            
        ];
        jsonData?.map(list => {
            sheet.addRow({
                name: list?.Name,
                age: list?.Age
            })
        })

        workbook.xlsx.writeBuffer().then(data=>{
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
            })
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'download.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url);
        })
    }

    return (
        <div>
            <div>
                <div className="">
                    <div className="flex justify-center">
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                jsonData.map((data, idx) => <tr key={idx}>
                                    <td>{data.Name}</td>
                                    <td>{data.Age}</td>
                                </tr>)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={handleExport} className="bg-[red] text-[#fff] font-bold rounded-lg px-6 py-2">Export Data</button>
                </div>
            </div>
        </div>
    );
};

export default Test;