/* import React from 'react';
import XLSX from 'xlsx';

class JSONToExcelExporter extends React.Component {
    exportToExcel = () => {
        const { jsonData, filename } = this.props;

        // Convert JSON to worksheet
        const worksheet = XLSX.utils.json_to_sheet(jsonData);

        // Create workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Save the workbook
        XLSX.writeFile(workbook, filename + '.xlsx');
    };

    render() {
        return (
            <button onClick={this.exportToExcel}>Export to Excel</button>
        );
    }
}

export default JSONToExcelExporter;
 */