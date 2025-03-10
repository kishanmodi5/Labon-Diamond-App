import React, { useEffect, useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonBackButton,
    IonButtons,
} from "@ionic/react";
import Header from './head';
import moment from 'moment';
import Axios, { baseURL } from "../service/jwtAuth";
import { useLocation } from 'react-router-dom';


const WebHistorytable = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const isFetching = { current: false };


    useEffect(() => {
        if (isFetching.current) return;
        isFetching.current = true;
        const fetchData = async () => {
            try {
                const startDate = searchParams.get('startDate');
                const endDate = searchParams.get('endDate');
                const transactionType = searchParams.get('transactionType');

                console.log("sddssd", transactionType)

                if (!startDate || !endDate) {
                    setIsLoading(false);
                    return;
                }

                const payload = {
                    startDate,
                    endDate,
                    ...(transactionType && { transactionType: transactionType.split(",").map((value) => Number(value)) }),
                }

                console.log(payload);

                const response = await Axios.post('transation/getuserOutwardTransactionData', payload);

                if (!response.ok) {
                    console.log('Failed to fetch invoice data');
                }

                setData(response.data?.Data);
            } catch (err) {
                console.log(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
                isFetching.current = false;
            }
        };

        fetchData();
    }, [searchParams.toString()]);

    const calculateDays = (transactionDate) => {
        const today = new Date();
        const transDate = new Date(transactionDate);
        const diffTime = Math.abs(today - transDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const totals = {
        pcs: data?.reduce((sum, row) => sum + row.PCS, 0),
        cts: data?.reduce((sum, row) => sum + row.CTS, 0),
        invoiceTotal: data?.reduce((sum, row) => sum + row.INV_AMT, 0),
        totalAmtS: data?.reduce((sum, row) => sum + row.INV_AMT, 0),
    };



    return (
        <>
            <Header />
            <IonContent color="primary" style={{ paddingBottom: '80x', marginBottom: '150px', marginTop: '10px' }}>
                <div style={{ marginTop: '20px' }}>
                    <h5 class="text-center mb-5 element">Web History Table</h5>
                </div>
                <IonGrid style={{ marginBottom: "70px" }}>
                    <IonRow>
                        <IonCol>
                            <div className='table-responsive pt-10'>
                                <table striped bordered hover style={{ width: '100%', color: 'black' }}>
                                    {/* Table Header */}
                                    <thead className="tablecss" style={{ backgroundColor: "#C19A6B", color: "white" }}>
                                        <tr>
                                            <th>No</th>
                                            <th>Order No</th>
                                            <th>No. Of Days</th>
                                            <th>CreatedBy</th>
                                            <th>Customer Name</th>
                                            <th>Pcs</th>
                                            <th>Cts</th>
                                            <th>Invoice Total</th>
                                            <th>Total Amt $</th>
                                            <th>Inv Report</th>
                                            <th>Memo Report</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.length > 0 ? (
                                            data.map((row, index) => (
                                                <tr key={row.no}>
                                                    <td>{index + 1}</td>
                                                    <td>{row.FL_BILL_NO}</td>
                                                    <td>{calculateDays(row.FL_TRANS_DATE)}</td>
                                                    <td>{row?.USERID}</td>
                                                    <td>{row?.PARTY_NAME}</td>
                                                    <td>{row?.PCS}</td>
                                                    <td>{row?.CTS?.toFixed(2)}</td>
                                                    <td>{row?.INV_AMT?.toFixed(2)}</td>
                                                    <td>{row?.INV_AMT?.toFixed(2)}</td>
                                                    <td>{row?.INV_TYPE}</td>
                                                    <td>{row?.memoReport}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={11} style={{ textAlign: 'center' }}>
                                                    No data found 
                                                </td>
                                            </tr>
                                        )}
                                        {/* Total Row */}
                                        <tr className="tablecss">
                                            <th colSpan="5">Total</th>
                                            <th>{totals?.pcs}</th>
                                            <th>{totals?.cts?.toFixed(2)}</th>
                                            <th>{totals?.invoiceTotal?.toFixed(2)}</th>
                                            <th>{totals?.totalAmtS?.toFixed(2)}</th>
                                            <th colSpan={3}></th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </IonCol>

                    </IonRow>
                </IonGrid>

            </IonContent>
        </>
    );
};

export default WebHistorytable;