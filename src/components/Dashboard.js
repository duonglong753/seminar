import React, { useEffect, useState } from 'react'
import { getMapping } from '../APIs/Mapping'
import moment from "moment";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const Dashboard = () => {
    const [data, setData] = useState([])
    const [exports, setExports] = useState([]);
    const [exportsAll, setExportsAll] = useState([]);
    const [mapping, setMapping] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState();

    const title = ["Barcode RFID", "RFID", "Tên sản phẩm", "Barcode", "Nhà kho"];
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    const [array, setArray] = useState({
        products: [],
        mapping: [],
    });
    console.log(exports);
    useEffect(() => {
        getMapping().then((result) => {
            setData(result)
        }).catch((err) => {

        });
    }, [])
    console.log(data);
    useEffect(() => {
        setLoading(true);
        getMapping().then((res) => {
            setLoading(false);
            const tmp = res;
            const check = tmp.filter((item) => {
                if (
                    moment(item._createdAt).toDate() >=
                    moment(date.startDate, "DD/MM/YYYY hh:mm").toDate() &&
                    moment(item._createdAt).toDate() <=
                    moment(date.endDate, "DD/MM/YYYY hh:mm").toDate()
                )
                    return item;
            });

            console.log("check :", check);

            if (!check.length) {
                setMapping(res);
            } else {
                setMapping(check);
            }

            setExports(check);
        });
    }, [date]);
    useEffect(() => {
        getMapping().then((res) => setExportsAll(res));
    }, []);
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };
    return (
        <div className='ml-[260px]'>
            <div class="flex-1 relative overflow-x-auto shadow-md sm:rounded-lg">
                <div class="title mt-30">MAPPING LIST</div>
                <button
                    // onClick={(e) => exportToCSV(mapping, "Mapping")}
                    type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center float-right">
                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"></path></svg>
                    <CSVLink
                        data={exportsAll.map((item) => ({
                            ID: item._id,
                            UPDATE_DATE: item._updatedAt,
                            ID_PRODUCT: item.code_product._id,
                            NAME_PRODUCT: item.code_product.name,
                            BARCODE: item.code_product.barcode.current,
                            CATEGORY: item.code_product.categoryProduct?.name,
                            DESCRIPTION: item.code_product.description,
                            PRICE: item.code_product.price,
                        }))}
                        filename={"Mapping"}
                    >
                        Export
                    </CSVLink>
                </button>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-30">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-7 py-3">
                                Barcode product
                            </th>
                            <th scope="col" class="px-7 py-3">
                                RFID
                            </th>
                            <th scope="col" class="px-7 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-7 py-3">
                                Product price
                            </th>
                            <th scope="col" class="px-7 py-3">
                                Product Image
                            </th>
                            <th scope="col" class="px-7 py-3">
                                Product category
                            </th>
                            <th scope="col" class="px-7 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((value, index) => {
                            return (
                                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {value.code_product.barcode?.current}
                                    </th>
                                    <td class="px-6 py-4">
                                        {value._id}
                                    </td>
                                    <td class="px-6 py-4">
                                        {value.code_product?.name}
                                    </td>
                                    <td class="px-6 py-4">
                                        {value.code_product.price}
                                    </td>
                                    <td class="px-6 py-4">
                                        <img src={value.code_product.image.asset.url} alt="" style={
                                            {
                                                width: 70,
                                            }
                                        } />
                                    </td>
                                    <td class="px-6 py-4">
                                        {value.code_product.categoryProduct?.name}
                                    </td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard