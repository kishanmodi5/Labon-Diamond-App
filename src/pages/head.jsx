import React, { useState, useContext, useRef, useEffect } from 'react';
import {
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonMenu,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonImg,
    IonMenuButton,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/react';
import { IonMenuToggle } from '@ionic/react';
import { BasketContext } from '../context/BasketContext';
import Axios, { baseURL } from "../service/jwtAuth";
import { SearchContext } from "../context/SearchContext";

function apps() {
    const [showDropdown, setShowDropdown] = useState(false);
    const {basketCount } = useContext(BasketContext);
    const [data, setData] = useState([''||0]);
    const isFetching = useRef(false)
    const [clientName, setClientName] = useState('');
    const {setSearchState, searchState } = useContext(SearchContext);
    

    const fetchData = async () => {
        if (isFetching.current) return;
        isFetching.current = true;
        try {
            const response = await Axios.get('user/watchlist');

            if (response.status === 200) {
                setData(response?.data?.data?.length); // Update state only if the component is still mounted
                // console.log(response?.data?.data?.length)
            }
        }
        catch (err) {
            console.log("Failed to fetch data. Please try again."); // Set error state
        }
        finally {

            isFetching.current = false;
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleDropdown = (e) => {
        e?.stopPropagation();
        setShowDropdown(!showDropdown);
    };


    const handleclearstorage = () => {
        localStorage.clear();

        sessionStorage.clear();
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-menu')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const user = localStorage.getItem('user') || sessionStorage.getItem('user');
        // const branchescode = localStorage.getItem('branches') || sessionStorage.getItem('branches')
        if (user) {
            // setCompany(JSON.parse(branchescode)[0].FL_COMPANY_CODE);
            // console.log('user.FL_USER_NAME',JSON.parse(user)?.FL_USER_NAME)
            setClientName(JSON.parse(user)?.FL_USER_NAME)
        }
    }, [])



    

    return (
        <>
            <IonHeader >
                <IonToolbar style={{ background: '#a97550' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', marginTop:'10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IonButtons slot="start">
                                <IonMenuButton fill='clear' >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" class="bi bi-list" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                                </svg>
                                </IonMenuButton>
                            </IonButtons>
                            <IonImg
                                slot="start"
                                src="img/logo.svg"
                                style={{ height: '24px', margin: '0', marginLeft: '0px' }}
                            ></IonImg>
                        </div>
                        <div style={{ position: 'relative',display:"flex", justifyContent:"end" }}>
                            <button onClick={toggleDropdown} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px',marginLeft:"auto" ,width:"30px"}}>
                                <IonImg
                                    slot="start"
                                    src="img/user.png"
                                    style={{ height: '30px', marginleft: '0' }}
                                ></IonImg>
                            </button>
                            
                        </div>
                        
                    </div>
                    
                </IonToolbar>
                {showDropdown && (
                                <div className='dropdown-menu' style={{ position: 'absolute', right: '15px', top: '50px', border: '1px solid #ccc', zIndex: 10000000000 }}>
                                    <div className="profile">
                                        <h6 className="text-center mt-2">{clientName}</h6>
                                    </div>
                                    <a href="/login" style={{ cursor: 'pointer' }} onClick={handleclearstorage}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"></path><path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"></path></svg>
                                        Logout</a>
                                </div>
                            )}
            </IonHeader>
         
           
       

      

            <div className='bottombtm-min'>
                <div className='bottombtm'>
                    <a href="/home" size='small' >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#FFDEB3" className="bi bi-house-door" viewBox="0 0 16 16">
                            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                        </svg>
                    </a>
                    <a href="/watchlist" size='small'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#FFDEB3" className="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                        {data >= 0 && (
                            <span className="count-shop">{data ||0}</span>
                        )}
                        {/* <span className="count-shop">
                        </span> */}
                    </a>
                    <a href="/basket" size='small'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#FFDEB3" className="bi bi-cart3" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        {basketCount>= 0 &&  (
                            <span className="count-shop">{basketCount}</span>
                        )}
                        {/* <span className="count-shop">{basketCount}
                        </span> */}
                    </a>
                    <a href="/login" size='small' onClick={handleclearstorage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="28" fill="#FFDEB3" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                        </svg>
                    </a>
                </div>
            </div>
            <IonMenu contentId="main-content" style={{ zIndex: 10000000000 }}>
            <IonHeader >
                <IonToolbar color="secondary" >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' ,marginRight:"auto"}}>
                    <IonImg
                        slot="start"
                        src="img/min-logo.svg"
                        style={{ width:"30px",height: '35px',marginLeft:"10px" }}
                    ></IonImg>
                    </div>
                    <div>
                    <IonMenuToggle>
                        <IonButton fill='clear'><ion-icon name="close-outline" size='large' style={{ color: 'white' }}></ion-icon></IonButton>
                    </IonMenuToggle>
                    </div>
                </div>
                </IonToolbar>
            </IonHeader>
            <IonContent class='main-saidebar'>
                <IonGrid style={{ marginTop: '6px' }} >
                <IonRow>
                    <IonCol>
                    <div style={{ marginBottom: '10px', marginTop: '7px' }} className='bottom-footer-menu '>
                        <div style={{ marginBottom: '10px', fontSize: '18px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '600' }}>- Stone inventory </span>
                        </div>
                        <ion-router-link href="/home">
                        <div className='d-flex' style={{ gap: '10px', marginBottom: '10px', marginLeft: "15px" , borderRadius:'8px',padding:'8px',border:'1px solid #4c32266b'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4c3226" class="bi bi-gem" viewBox="0 0 16 16">
                            <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6zm11.386 3.785-1.806-2.41-.776 2.413zm-3.633.004.961-2.989H4.186l.963 2.995zM5.47 5.495 8 13.366l2.532-7.876zm-1.371-.999-.78-2.422-1.818 2.425zM1.499 5.5l5.113 6.817-2.192-6.82zm7.889 6.817 5.123-6.83-2.928.002z" />
                            </svg>
                            <span>Search Stone</span>
                        </div>
                        </ion-router-link>

                        <ion-router-link href="/basket">
                        <div className='d-flex' style={{ gap: '10px', marginBottom: '10px', marginLeft: "15px" , borderRadius:'8px',padding:'8px',border:'1px solid #4c32266b'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4c3226" class="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                            <span>Basket</span>
                        </div>
                        </ion-router-link>
                        <ion-router-link href="/webhistory">
                        <div className='d-flex' style={{ gap: '10px', marginBottom: '10px', marginLeft: "15px" , borderRadius:'8px',padding:'8px',border:'1px solid #4c32266b'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4c3226" class="bi bi-hourglass-bottom" viewBox="0 0 16 16">
                            <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2z" />
                            </svg>
                            <span>Web History</span>
                        </div>
                        </ion-router-link>
                        <ion-router-link href="/watchlist">
                        <div className='d-flex' style={{ gap: '10px', marginBottom: '10px', marginLeft: "15px" , borderRadius:'8px',padding:'8px',border:'1px solid #4c32266b'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4c3226" class="bi bi-view-list" viewBox="0 0 16 16">
                            <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14" />
                            </svg>
                            <span>Watch List</span>
                        </div>
                        </ion-router-link>
                        <ion-router-link href="/changepass">
                        <div className='d-flex' style={{ gap: '10px', marginBottom: '10px', marginLeft: "15px" , borderRadius:'8px',padding:'8px',border:'1px solid #4c32266b'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4c3226" class="bi bi-unlock" viewBox="0 0 16 16">
                            <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" />
                            </svg>
                            <span>Change Password</span>
                        </div>
                        </ion-router-link>
                    </div>

                    <div style={{ marginBottom: '10px', }} className='bottom-footer-menu '>
                        <div style={{ marginBottom: '10px', fontSize: '18px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '600', marginTop:'25px' }}>- Address</span>
                        </div>
                        <div className='d-flex' style={{ gap: '10px', marginBottom: '10px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4c3226" class="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        <span>22 West 48th St. Suite #1101,
                            New York, NY 10036, USA <br />
                            <b>(213) 688-8704</b>
                        </span>
                        </div>
                        <div className='d-flex' style={{ gap: '10px', marginBottom: '10px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4c3226" class="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        <span>550 S. Hill St. Suite #1123,
                            Los Angeles, CA 90013, USA<br />
                            <b>(315) 207-7066</b>
                        </span>
                        </div>
                        <div className='d-flex' style={{ gap: '10px', marginBottom: '10px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4c3226" class="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                        </svg>
                        <span>sales@labondiamonds.com</span>
                        </div>

                    </div >

                    </IonCol >
                </IonRow>
                </IonGrid>
            </IonContent >
        </IonMenu>
        </>
    );
}

export default apps;

