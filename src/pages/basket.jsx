import React, { useEffect, useState, useRef } from 'react';
import {
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonImg,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonPopover,
    IonAccordion,
    IonAccordionGroup,
    IonRadio,
    IonRadioGroup,
    IonTextarea,
    IonChip,
    IonicSlides,
    IonButtons,
    IonToast
} from '@ionic/react';
import { IonCol, IonGrid, IonRow, IonTabButton } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Header from './head';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../pages/Tab1.css';
import Like from './like';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import Axios, { baseURL } from "../service/jwtAuth";


function Basket() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [clientName, setClientName] = useState('');
    const [company, setCompany] = useState('');
    const [data, setData] = useState([]);
    const [count, setcount] = useState([]);
    const [selectedtotals, setSelectedTotals] = useState({});
    const isFetching = useRef(false)
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tabselect, settabselect] = useState({
        single: true,
        parcel: false
    });
    // useEffect(() => {
    //     console.log('selectedRows', selectedRows)
    // }, [selectedRows])

    const handleRowSelect = (item) => {
        if (tabselect.single) {
            setSelectedRows((prevSelected) => {
                const isSelected = prevSelected.some(selected => selected.STONE === item.STONE);
                if (isSelected) {
                    // Remove the item if already selected
                    return prevSelected.filter(selected => selected.STONE !== item.STONE);
                } else {
                    // Add the complete item if not selected
                    return [...prevSelected, item];
                }
            });
        } else {
            setSelectedRows((prevSelected) => {
                const isSelected = prevSelected.some(selected => selected.FL_SUB_LOT === item.FL_SUB_LOT);
                if (isSelected) {
                    // Remove the item if already selected
                    return prevSelected.filter(selected => selected.FL_SUB_LOT !== item.FL_SUB_LOT);
                } else {
                    // Add the complete item if not selected
                    return [...prevSelected, item];
                }
            });
        }
    };

    const transformData = (data) => {
        const csvData = data?.map((item) => ({
            'LOT NO': item.FL_SUB_LOT,
            Type: item.FL_INVENTORY_TYPE,
            Carats: item.FL_CARATS,
            Clarity: item.FL_CLARITY,
            Color: item.FL_COLOR,
            'Co ID': item.FL_COID,
            // Height: item.FL_HIGHT,
            // Length: item.FL_LENGTH,
            Main_LOT: item.FL_MAIN_LOT,
            Shape: item.FL_SHAPE_GROUP,
            // 'MM Size': item.FL_SIZE,
            // 'Width': item.FL_WIDTH,
            'Location': item.FL_BRID
        }));

        return csvData;
    };

    const convertToCSV = (data) => {
        if (!Array.isArray(data) || data.length === 0) return '';

        // Extract headers (keys of the first object)
        const headers = Object.keys(data[0]);

        // Convert each row to a CSV line
        const rows = data.map((row) =>
            headers.map((header) => `"${row[header] ?? ''}"`).join(',')
        );

        // Combine headers and rows
        return [headers.join(','), ...rows].join('\n');
    };

    // Function to trigger CSV download
    const downloadCSV = (csvData, fileName = 'data.csv') => {
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handledownload = () => {
        if (selectedRows.length === 0) {
            window.alert('Please select stones to export.');
            return;
        }
        const transformedData = transformData((selectedRows));
        const csvData = convertToCSV(transformedData);
        downloadCSV(csvData, 'diamond_data.csv');
        console.log(transformedData);
    }


    const sortfilter = (col) => {
        const sortedValue = [...data].sort((a, b) => {
            const aValue = a[col] ? a[col].toString() : "";
            const bValue = b[col] ? b[col].toString() : "";

            if (sortOrder === "asc") {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });
        setData(sortedValue);
    };

    const handleSort = (col) => {
        if (sortBy === col) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(col);
            setSortOrder("asc");
        }
        sortfilter(col);
    };

    useEffect(() => {
        const user = localStorage.getItem('user') || localStorage.getItem('user');
        const branchescode = localStorage.getItem('branches') || localStorage.getItem('branches')
        if (user) {
            setCompany(JSON.parse(branchescode)[0].FL_COMPANY_CODE);
            // console.log('user.FL_USER_NAME',JSON.parse(user)?.FL_USER_NAME)
            setClientName(JSON.parse(user)?.FL_USER_NAME)
        }
    }, [])

    const fetchData = async (single) => {
        if (isFetching.current) return;    
        isFetching.current = true; 
    
        if (single === 'parcel') {
    
            try {
                const response = await Axios.post('user/userbasket', {
                    type: 'S',
                    stype: 'parcel'
                });
    
                if (response.status === 200) {
                    setcount(response.data.count);
                    setData(response?.data?.data);                
                }
            }
            catch (err) {
                console.log("Failed to fetch data. Please try again."); 
            }
        } else {
        
            try {
                const response = await Axios.post('user/userbasket', {
                    type: 'S',
                    stype: 'single'
                });
    
                if (response.status === 200) {
                    setcount(response.data.count);
                    setData(response?.data?.data); 
                }
            }
            catch (err) {
                console.log("Failed to fetch data. Please try again."); 
            }
        }    
        isFetching.current = false; 
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let newSelectedTotals = {
            pcs: selectedRows.length,
            CARATS: selectedRows?.reduce((sum, row) => sum + row.CARATS, 0),
            RAP: selectedRows?.reduce((sum, row) => sum + row.RAP_PRICE, 0),
            ASK_DISC: selectedRows?.reduce((sum, row) => sum + (row.ASK_DISC / selectedRows.length), 0),
            // pricects: selectedRows?.reduce((sum, row) => sum + (row.RAP_PRICE * (100 - Number(row.ASK_DISC)) / 100), 0),
            pricects: selectedRows?.length > 0 ?
                selectedRows?.reduce((sum, row) => sum + (row.RAP_PRICE * (100 - Number(row.ASK_DISC)) / 100) * (row.CARATS), 0) /
                selectedRows?.reduce((sum, row) => sum + row.CARATS, 0) : 0,
            amount: selectedRows?.reduce((sum, row) => sum + (row.RAP_PRICE * (100 - Number(row.ASK_DISC)) / 100) * row.CARATS, 0),
        };

        setSelectedTotals(newSelectedTotals);

        console.log(selectedtotals)
    }, [selectedRows]);

    const totals = {
        CARATS: data?.reduce((sum, row) => sum + row.CARATS, 0),
        ASK_DISC: data?.reduce((sum, row) => sum + (row.ASK_DISC / data.length), 0),
        // pricects: data?.reduce((sum, row) => sum + (row.RAP_PRICE * (100 - Number(row.ASK_DISC)) / 100), 0),
        pricects: data?.length > 0 ?
            data?.reduce((sum, row) => sum + (row.RAP_PRICE * (100 - Number(row.ASK_DISC)) / 100) * (row.CARATS), 0) /
            data?.reduce((sum, row) => sum + row.CARATS, 0) : 0,
        amount: data?.reduce((sum, row) => sum + (row.RAP_PRICE * (100 - Number(row.ASK_DISC)) / 100) * row.CARATS, 0),
    };

    const handleremovebasket = async () => {
        if (tabselect.single) {
        try {
            const response = await Axios.post('user/userbasket', {
                type: 'D',
                stype: 'single',
                stone_id: selectedRows.map(row => row.STONE),
            })
            if (response.status === 200) {
                // window.alert('Remove from basket successfully');
                setToastMessage(response?.data?.status);
                setShowToast(true);
                fetchData('single')
            }
        } catch (error) {
            console.log('error while removing basket', error)
            setToastMessage(error.response.data)
            // setToastMessage('User not found.');
            setShowToast(true);
        }
    }
    else{
        try {
            const response = await Axios.post('user/userbasket', {
                type: 'D',
                stype: 'parcel',
                stone_id: selectedRows.map(row => row.STONE),
            })
            if (response.status === 200) {
                // window.alert('Remove from basket successfully');
                setToastMessage(response?.data?.status);
                setShowToast(true);
                fetchData('parcel')
            }
        } catch (error) {
            console.log('error while removing basket', error)
            setToastMessage(error.response.data)
            // setToastMessage('User not found.');
            setShowToast(true);
        }
    }
    }


    const handleExportSelectedToExcel = async () => {
        setIsLoading(true);
    
        if (selectedRows.length === 0) {
            window.alert('Please select stones to export.');
            setIsLoading(false); 
            return;
        }
    
        if(tabselect.single){
            try {
                const payload = {
                    stoneCert: selectedRows?.map(row => row.STONE).join(' '),
                }
                const response = await Axios.post('/search/stoneUser?type=excel', payload);
        
                if (response.data.status === 'success') {
                    // window.open(`${baseURL}exports/${response.data.fileName}`)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            handledownload();
            setIsLoading(false);
        }
    }
    

    return (
        <>
            <Header />
            <IonContent color="primary" style={{ paddingBottom: '80x', marginBottom: '100px', marginTop: '10px' }}>
                <div style={{ marginTop: '20px' }}>
                    <h5 class="text-center mb-5 element">Basket</h5>
                </div>
                <div style={{ display: 'flex', gap: '10px', margin:'10px 0px 15px 15px' }}>
                    <button
                        className={tabselect.single ? 'sumbutton' : 'sumbutton sumbutton-11'}
                        onClick={() => {
                            settabselect(prev => ({
                                ...prev,
                                single: true,
                                parcel: false
                            }))
                            fetchData('single');
                            setSelectedRows([]);
                        }}>SINGLE</button>
                    <button
                        className={tabselect.parcel ? 'sumbutton' : 'sumbutton sumbutton-11'}
                        onClick={() => {
                            settabselect((prev) => ({
                                ...prev,
                                single: false,
                                parcel: true
                            }))
                            fetchData('parcel');
                            setSelectedRows([]);
                        }}
                    >PARCEL</button>
                </div>
                <div className='myquotations'>
                    <IonGrid style={{marginBottom:'90px'}}>
                        <IonRow>
                            <IonCol>
                                <div className="mainbtn" style={{ justifyContent: "start", marginBottom: "15px" }}>
                                    <button className="sumbutton" onClick={handleExportSelectedToExcel} disabled={isLoading}>{isLoading ? "Loading..." : "Export To Excel"}</button>
                                    <button className="sumbutton" onClick={handleremovebasket} >Remove to Basket</button>
                                    {/* <button className="sumbutton">INTEREST SLIP</button> */}
                                </div>
                                <div style={{
                                    marginBottom: "10px",
                                    fontWeight: 400,
                                    marginRight: "auto",
                                    display: "flex",
                                    gap: "6px",
                                    color: "black"
                                }}>
                                    <span>Client Name:</span>
                                    <div style={{ marginLeft: "8px", display: "block", color: "#4c3226" }}>{clientName}</div>
                                </div>
                                { 
                                 tabselect.single &&  <ul className="tabletopcss">
                               
                                    <li>Total Pcs = <span>{selectedtotals?.pcs}</span></li>
                                    <li>Cts = <span>{selectedtotals?.CARATS?.toFixed(2)}</span></li>
                                    <li>Rap = <span>{selectedtotals?.RAP?.toFixed(2)}</span></li>
                                    <li>Disc% = <span>{selectedtotals?.ASK_DISC?.toFixed(2)}</span></li>
                                    <li>Price = <span>{selectedtotals?.pricects?.toFixed(2)}</span></li>
                                    <li>Amt $ = <span>{selectedtotals?.amount?.toFixed(2)}</span></li>
                                </ul>
                            }

                                {
                                    tabselect?.single ? <>
                                <div className='table-responsive pt-10'>
                                    <table striped bordered hover style={{ width: 'max-content', color: 'black' }} >
                                        <thead className="tablecss" >
                                            <tr>
                                                <th>
                                                    <label class="checkbox style-a">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => {
                                                                if (selectedRows.length === data.length) {
                                                                    setSelectedRows([]);
                                                                } else {
                                                                    setSelectedRows(data?.map(item => item));
                                                                }
                                                            }}
                                                            checked={selectedRows.length === data.length}
                                                        />
                                                        <div class="checkbox__checkmark"></div>
                                                    </label>
                                                </th>
                                                <th>Status</th>
                                                <th>Location</th>
                                                <th>StoneId</th>
                                                <th onClick={() => handleSort("LAB")}> Lab {sortBy === "LAB" ? (sortOrder === "asc" ? ' ▲' : ' ▼') : '▼'}</th>
                                                <th>ReportNo</th>
                                                <th onClick={() => handleSort("SHAPE")}>
                                                    Shape {sortBy === "SHAPE" ? (sortOrder === "asc" ? ' ▲' : ' ▼') : '▼'}
                                                </th>
                                                <th onClick={() => handleSort("CARATS")}>
                                                    Carats {sortBy === "CARATS" ? (sortOrder === "asc" ? ' ▲' : ' ▼') : '▼'}</th>
                                                <th onClick={() => handleSort("COLOR")}>
                                                    Color {sortBy === "COLOR" ? (sortOrder === "asc" ? ' ▲' : ' ▼') : '▼'}</th>
                                                <th onClick={() => handleSort("CLARITY")}>
                                                    Clarity {sortBy === "CLARITY" ? (sortOrder === "asc" ? ' ▲' : ' ▼') : '▼'}</th>
                                                <th onClick={() => handleSort("CUT")}>
                                                    Cut{sortBy === "CUT" ? (sortOrder === "asc" ? ' ▲' : ' ▼') : '▼'}</th>
                                                <th onClick={() => handleSort("POLISH")}>
                                                    Polish{sortBy === "POLISH" ? (sortOrder === "asc" ? ' ▲' : ' ▼') : '▼'}</th>
                                                <th onClick={() => handleSort("SYMM")}>
                                                    Symm{sortBy === "SYMM" ? (sortOrder === "asc" ? ' ▲' : ' ▼') : '▼'}</th>
                                                <th>Measurements</th>
                                                <th>Table %</th>
                                                <th>Depth %</th>
                                                <th>Ratio</th>
                                                <th>H&A</th>
                                                <th>RapPrice</th>
                                                <th>Discount %</th>
                                                <th>Price/Cts</th>
                                                <th onClick={() => handleSort("AMOUNT")}>
                                                    Amount{sortBy === "AMOUNT" ? (sortOrder === "asc" ? ' ▲' : ' ▼') : '▼'}</th>
                                                <th>View Offer</th>
                                                <th>Certificate</th>
                                                <th>VideoLink</th>
                                            </tr>
                                        </thead>
                                        <tbody className="tablecss">
                                            {data?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {/* <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.srNo)}
                                            onChange={() => handleRowSelect(item.srNo)}
                                        /> */}
                                                        <label className="checkbox style-a">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedRows.some(selected => selected.STONE === item.STONE)}
                                                                onChange={() => handleRowSelect(item)}
                                                            />
                                                            <div className="checkbox__checkmark"></div>
                                                        </label>
                                                    </td>
                                                    {/* <td>{item.srNo}</td> */}
                                                    <td>{item.STATUS}</td>
                                                    <td>{item.FL_BRID}</td>
                                                    <td>{item.STONE}</td>
                                                    <td><a style={{ color: 'blue' }} href={`https://www.igi.org/reports/verify-your-report?r=${item.REPORTNO}`} target="_blank">{item.LAB}</a></td>
                                                    <td>{item.REPORTNO}</td>
                                                    <td>{item.SHAPE}</td>
                                                    <td>{item.CARATS}</td>
                                                    <td>{item.COLOR}</td>
                                                    <td>{item.CLARITY}</td>
                                                    <td>{item.CUT}</td>
                                                    <td>{item.POLISH}</td>
                                                    <td>{item.SYMM}</td>
                                                    <td>{item.FL_MEASUREMENTS}</td>
                                                    <td>{item.FL_TABLE_PER?.toFixed(2)}</td>
                                                    <td>{item.FL_DEPTH_PER?.toFixed(2)}</td>
                                                    <td>{item.FL_RATIO || '-'}</td>
                                                    <td>{item.ha}</td>
                                                    <td>{item.RAP_PRICE?.toFixed(2)}</td>
                                                    <td>{item.ASK_DISC}</td>
                                                    <td>{(item.RAP_PRICE * (100 - Number(item.ASK_DISC)) / 100)?.toFixed(2)}</td>
                                                    <td>{((item.RAP_PRICE * (100 - Number(item.ASK_DISC)) / 100) * item.CARATS)?.toFixed(2)}</td>
                                                    <td>{item.viewoffer}</td>
                                                    <td><a href={`https://www.igi.org/reports/verify-your-report?r=${item.REPORTNO}`} target="_blank" style={{ color: 'blue' }}>PDF</a></td>
                                                    <td><a href={`https://www.dnav360.com/vision/dna.html?d=${item.STONE}&ic=1`} target="_blank" style={{ color: 'blue' }}>VIDEO</a></td>

                                                </tr>
                                            ))}

                                            <tr className="tablecss">
                                                <th></th>
                                                <th colSpan={6}>Total</th>
                                                <th>{totals.CARATS?.toFixed(2)}</th>
                                                <th colSpan={10}></th>
                                                <th></th>
                                                <th>{count[0]?.AVG?.toFixed(2)}</th>
                                                <th>{totals.pricects?.toFixed(2)}</th>
                                                <th>{totals.amount?.toFixed(2)}</th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                </> : <>
                                <div className='table-responsive pt-10'>
                                            <table striped bordered hover style={{ width: 'max-content', color: 'black' }} >
                                                <thead className="tablecss" >
                                                    <tr>
                                                        <th>
                                                            <label className="checkbox style-a">
                                                                <input type="checkbox"
                                                                    onChange={() => {
                                                                        if (selectedRows?.length === data?.length) {
                                                                            setSelectedRows([]);
                                                                        } else {
                                                                            setSelectedRows(data?.map(item => item));
                                                                        }
                                                                    }}
                                                                    checked={selectedRows?.length === data?.length}
                                                                />
                                                                <div className="checkbox__checkmark"></div>
                                                            </label>
                                                        </th>
                                                        {/* <th>SrNo</th> */}
                                                        <th>Type</th>
                                                    <th>Location</th>
                                                    <th>In Stock</th>
                                                    <th>LOT NO</th>
                                                    <th>Carats</th>
                                                    <th>Clarity</th>
                                                    <th>CO ID</th>
                                                    <th>Color</th>
                                                    {/* <th>Height</th> */}
                                                    {/* <th>Length</th> */}
                                                    <th>Main_LOT</th>
                                                    <th>Shape</th>
                                                    {/* <th>MM Size</th> */}
                                                    {/* <th>Width</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody className="tablecss">
                                                {data?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <label className="checkbox style-a">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedRows?.some(selected => selected.FL_SUB_LOT === item.FL_SUB_LOT)}
                                                                    onChange={() => handleRowSelect(item)}

                                                                />
                                                                <div className="checkbox__checkmark"></div>
                                                            </label>
                                                        </td>
                                                        {/* <td>{item.srNo}</td> */}
                                                        <td>{item.FL_INVENTORY_TYPE}</td>
                                                        <td>{item.FL_BRID}</td>
                                                        <td>A</td>
                                                        <td>{item.FL_SUB_LOT}</td>
                                                        <td>{item.FL_CARATS}</td>
                                                        <td>{item.FL_CLARITY}</td>
                                                        <td>{item.FL_COID}</td>
                                                        <td>{item.FL_COLOR}</td>
                                                        {/* <td>{item.FL_HIGHT}</td> */}
                                                        {/* <td>{item.FL_LENGTH}</td> */}
                                                        <td>{item.FL_MAIN_LOT}</td>
                                                        <td>{item.FL_SHAPE_GROUP}</td>
                                                        {/* <td>{item.FL_SIZE}</td> */}
                                                        {/* <td>{item.FL_WIDTH}</td> */}
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                </>
}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message={toastMessage}
                        duration={2000}
                    />
                </div>
            </IonContent >

        </ >
    );
}
export default Basket; 