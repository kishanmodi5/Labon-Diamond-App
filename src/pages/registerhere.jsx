import React, { useRef, useState, useEffect } from 'react';
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
    IonGrid,
    IonRow,
    IonCol,
    IonToast
} from '@ionic/react';
import { IonInput } from '@ionic/react';
import { IonInputPasswordToggle } from '@ionic/react';
import Axios from "../service/jwtAuth";
import { useHistory } from "react-router-dom";

function Register() {

    const history = useHistory();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const countryStateCityInfo = {
        "Australia": {
            "Western Australia": {
                "Broome": ["6725", "6318", "6701"],
                "Coolgardie": ["6429", "6432"]
            },
            "Tasmania": {
                "Hobart": ["7000", "7520"],
                "Launceston": ["7250", "7334"],
                "Burnie": ["7320", "7315"]
            }
        },
        "Belgium": {
            "Flanders": {
                "Antwerp": ["2000", "2018", "2020"],
                "Ghent": ["9000", "9001", "9031"]
            },
            "Wallonia": {
                "Namur": ["5000", "5001", "5002"],
                "Liège": ["4000", "4020", "4030"]
            }
        },
        "Canada": {
            "Alberta": {
                "Calgary": ["8033", "8333", "8035"],
                "Edmonton": ["9040", "9403", "9040"]
            },
            "Manitoba": {
                "Brandon": ["6030", "6030"],
                "Winnipeg": ["5524", "5547", "5248"]
            }
        },
        "China": {
            "Beijing": {
                "Chaoyang": ["100020", "100025", "100028"],
                "Haidian": ["100080", "100081", "100083"]
            },
            "Shanghai": {
                "Pudong": ["200120", "200135", "200136"],
                "Huangpu": ["200001", "200002", "200003"]
            }
        },
        "Germany": {
            "Bavaria": {
                "Munich": ["80331", "80333", "80335"],
                "Nuremberg": ["90402", "90403", "90404"]
            },
            "Hessen": {
                "Frankfurt": ["60306", "60309", "60310"],
                "Darmstadt": ["64283", "64285", "64289"]
            }
        },
        "Hong Kong": {
            "Hong Kong Island": {
                "Central": ["0001", "0002"],
                "Sheung Wan": ["0003", "0004"]
            },
            "Kowloon": {
                "Mong Kok": ["0005", "0006"],
                "Tsim Sha Tsui": ["0007", "0008"]
            }
        },
        "India": {
            "Maharashtra": {
                "Mumbai": ["400001", "400002", "400003"],
                "Pune": ["411001", "411002", "411003"]
            },
            "Karnataka": {
                "Bangalore": ["560001", "560002", "560003"],
                "Mysore": ["570001", "570002"]
            }
        },
        "Israel": {
            "Central District": {
                "Petah Tikva": ["49001", "49002"],
                "Netanya": ["42001", "42002"]
            },
            "Tel Aviv District": {
                "Tel Aviv": ["61000", "61001"],
                "Ramat Gan": ["52000", "52001"]
            }
        },
        "Italy": {
            "Lazio": {
                "Rome": ["00118", "00119", "00120"],
                "Frosinone": ["03100", "03101"]
            },
            "Lombardy": {
                "Milan": ["20121", "20122", "20123"],
                "Bergamo": ["24121", "24122"]
            }
        },
        "Japan": {
            "Tokyo": {
                "Shibuya": ["150-0001", "150-0002"],
                "Shinjuku": ["160-0001", "160-0002"]
            },
            "Osaka": {
                "Osaka": ["530-0001", "530-0002"],
                "Sakai": ["590-0001", "590-0002"]
            }
        },
        "Singapore": {
            "Central Region": {
                "Orchard": ["238841", "238842"],
                "Bugis": ["188021", "188022"]
            },
            "East Region": {
                "Tampines": ["529501", "529502"],
                "Bedok": ["460001", "460002"]
            }
        },
        "Spain": {
            "Catalonia": {
                "Barcelona": ["08001", "08002"],
                "Girona": ["17001", "17002"]
            },
            "Andalusia": {
                "Seville": ["41001", "41002"],
                "Malaga": ["29001", "29002"]
            }
        },
        "Thailand": {
            "Bangkok": {
                "Sukhumvit": ["10110", "10111"],
                "Silom": ["10500", "10501"]
            },
            "Chiang Mai": {
                "Nimmanhaemin": ["50200", "50201"],
                "Old City": ["50202", "50203"]
            }
        },
        "UAE": {
            "Dubai": {
                "Deira": ["0001", "0002"],
                "Jumeirah": ["0003", "0004"]
            },
            "Abu Dhabi": {
                "Corniche": ["0005", "0006"],
                "Al Reem": ["0007", "0008"]
            }
        },
        "UK": {
            "England": {
                "London": ["EC1A", "WC1A"],
                "Manchester": ["M1", "M2"]
            },
            "Scotland": {
                "Edinburgh": ["EH1", "EH2"],
                "Glasgow": ["G1", "G2"]
            }
        },
        "USA": {
            "California": {
                "Los Angeles": ["90001", "90002"],
                "San Francisco": ["94101", "94102"]
            },
            "New York": {
                "New York City": ["10001", "10002"],
                "Buffalo": ["14201", "14202"]
            }
        }

    };

    const [formData, setFormData] = useState({
        cname: '',
        title: 'MR',
        fname: '',
        lname: '',
        email: '',
        country: '',
        state: '',
        city: '',
        mobile: '',
        aboutUs: '',
        loginEmail: '',
        pass: '',
        confirmPassword: '',
        securityQuestion: '',
        securityAnswer: '',
        agreeToTerms: false
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [zips, setZips] = useState([]);

    // useEffect(() => {
    //     console.log('formData', formData)
    // }, [formData])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setFormData(prev => ({
            ...prev,
            country,
            state: '',
            city: ''
        }));
        setStates(Object.keys(countryStateCityInfo[country] || {}));
        setCities([]);
        setZips([]);
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setFormData(prev => ({
            ...prev,
            state,
            city: ''
        }));
        setCities(Object.keys(countryStateCityInfo[formData.country][state] || {}));
        setZips([]);
    };

    const handleCityChange = (e) => {
        const city = e.target.value;
        setFormData(prev => ({
            ...prev,
            city
        }));
        setZips(countryStateCityInfo[formData.country][formData.state][city] || []);
    };

    const validateForm = () => {
        if (formData.pass !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (!formData.agreeToTerms) {
            setError('Please agree to the Terms and Conditions');
            return false;
        }
        if (formData.pass.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            const response = await Axios.post('user/addnewuser', JSON.stringify(formData));

            if (response.data.message === "user registered Sucessfully") {
                window.location.href = '/login';
                history.push("/login");
                setToastMessage(response.data.message);
                setShowToast(true);
            } else {
                if (response.data.error === "ORA-00001: unique constraint (SALESEX.UN_FL_USERNAME) violated\nORA-06512: at line 5\nHelp: https://docs.oracle.com/error-help/db/ora-00001/") {
                    setError('user already exists')
                }
            }
        } catch (err) {
            setToastMessage(err.response.data.message)
            setShowToast(true);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <IonPage style={{ background: '#fff6ec' }}>
                <div className='main-bg' style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                    <div style={{ width: '100%', height: '30px', background: '#4c3226', position: 'absolute', left: ' 0', top: '0', zIndex: '999' }}></div>


                    <IonGrid>
                        <IonRow>

                            <IonCol size-md='6' size-sm='8' size='12'>

                                <div color='secondary' style={{ width: '100%', marginTop: '50px', padding: '9px', background: '#fff' }}>
                                    <h6 class="text-center mb-5 element" style={{ marginTop: '10px', fontSize: '20px' }}>Register</h6>
                                    {error && (
                                        <div className="alert alert-danger text-center">
                                            {error}
                                        </div>
                                    )}
                                    <form className='form-details' style={{ marginTop: '20px' }} color='secondary' onSubmit={handleSubmit}>
                                        <div tyle={{ display: 'flex' }}>
                                            <input
                                                style={{ background: '#ffdeb300', color: '#000', width: '100%', border: 'none', borderBottom: '1px solid rgba(76, 50, 38, 0.67)',border: '1px solid white', marginBottom: '15px', padding: '8px' }}
                                                type="text"
                                                name="cname"
                                                placeholder="Company Name of Account Applicant as appears officially *"
                                                value={formData.cname}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                style={{ background: '#ffdeb300', color: '#000', width: '100%', border: 'none', borderBottom: '1px solid rgba(76, 50, 38, 0.67)', border: '1px solid  white', padding: '8px', marginBottom: '15px', }}
                                                type="text"
                                                name="fname"
                                                value={formData.fname}
                                                onChange={handleInputChange}
                                                placeholder="First Name *"
                                                required
                                                className="w-full rounded-md shadow-sm"

                                            />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                style={{ background: '#ffdeb300', color: '#000', width: '100%', border: 'none', borderBottom: '1px solid rgba(76, 50, 38, 0.67)',border: '1px solid white', padding: '8px', marginBottom: '15px' }}
                                                type="text"
                                                name="lname"
                                                value={formData.lname}
                                                onChange={handleInputChange}
                                                placeholder="Last Name *"
                                                required

                                            />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                style={{ background: '#ffdeb300', color: '#000', width: '100%', border: 'none', borderBottom: '1px solid rgba(76, 50, 38, 0.67)',border: '1px solid white', padding: '8px', marginBottom: '15px' }}
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter Email *"
                                                required

                                            />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div className="input-box main-selct" style={{ width: '100%' }}>
                                                <select
                                                    style={{ background: '#ffdeb300', color: '#000', width: '100%', padding: '8px', margin: '8px 0px', borderRadius: '7px', border:'1px solid #4c32269e' }}
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleCountryChange}
                                                    required
                                                >
                                                    <option value="" >Select Country</option>
                                                    {Object.keys(countryStateCityInfo).map((country) => (
                                                        <option key={country} value={country}>
                                                            {country}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div className="input-box main-selct" style={{ width: '100%' }}>
                                                <select
                                                    style={{ background: '#ffdeb300', color: '#000', width: '100%', padding: '8px', margin: '8px 0px', borderRadius: '7px',border:'1px solid #4c32269e' }}
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleStateChange}
                                                    disabled={!formData.country}
                                                    required
                                                >
                                                    <option value="" >Select State</option>
                                                    {states.map((state) => (
                                                        <option key={state} value={state}>
                                                            {state}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div className="input-box main-selct" style={{ width: '100%' }}>
                                                <select
                                                    style={{ background: '#ffdeb300', color: '#000', width: '100%', padding: '8px', margin: '8px 0px', borderRadius: '7px',border:'1px solid #4c32269e' }}
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleCityChange}
                                                    disabled={!formData.state}
                                                    required
                                                >
                                                    <option value="" >Select City</option>
                                                    {cities.map((city) => (
                                                        <option key={city} value={city}>
                                                            {city}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                style={{ background: '#ffdeb300', color: '#000', width: '100%', border: 'none', borderBottom: '1px solid rgba(76, 50, 38, 0.67)',border: '1px solid white', padding: '8px', marginBottom: '15px' }}
                                                type="tel"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleInputChange}
                                                placeholder="Phone Number *"
                                                required

                                            />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                style={{ background: '#ffdeb300', color: '#000', width: '100%', border: 'none', borderBottom: '1px solid rgba(76, 50, 38, 0.67)',border: '1px solid white', padding: '8px', marginBottom: '15px' }}
                                                type="text"
                                                name="aboutUs"
                                                value={formData.aboutUs}
                                                onChange={handleInputChange}
                                                placeholder="How did you know about us? *"
                                                required

                                            />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                style={{ background: '#ffdeb300', color: '#000', width: '100%', border: 'none', borderBottom: '1px solid rgba(76, 50, 38, 0.67)',border: '1px solid white', padding: '8px', marginBottom: '15px' }}
                                                type="email"
                                                name="loginEmail"
                                                value={formData.loginEmail}
                                                onChange={handleInputChange}
                                                placeholder="Login Email *"
                                                required

                                            />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                style={{ background: '#ffdeb300', color: '#000', width: '100%', border: 'none', borderBottom: '1px solid rgba(76, 50, 38, 0.67)',border: '1px solid white', padding: '8px', marginBottom: '15px' }}
                                                type="password"
                                                name="pass"
                                                value={formData.pass}
                                                onChange={handleInputChange}
                                                placeholder="Password *"
                                                required
                                            />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                style={{ background: '#ffdeb300', color: '#000', width: '100%', border: 'none', borderBottom: '1px solid rgba(76, 50, 38, 0.67)',border: '1px solid white', padding: '8px', marginBottom: '15px' }}
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                placeholder="Confirm Password *"
                                                required
                                            />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div className="input-box main-selct">
                                                <select
                                                    style={{ background: '#ffdeb300', color: '#000', width: '100%', padding: '8px', margin: '10px 0px 18px 0px', borderRadius: '7px', border:'1px solid #4c32269e' }}
                                                    name="securityQuestion"
                                                    value={formData.securityQuestion}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select Security Question</option>
                                                    <option value="nickname">What was your childhood nickname</option>
                                                    <option value="firstJob">In what city or town was your first job</option>
                                                    <option value="license">What are the last 5 digits of your drivers license number</option>
                                                    <option value="hero">Who was your childhood hero</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                style={{ background: '#ffdeb300', color: '#000', width: '100%', border: 'none', borderBottom: '1px solid rgba(76, 50, 38, 0.67)',border: '1px solid white', padding: '8px', marginBottom: '25px' }}
                                                type="text"
                                                name="securityAnswer"
                                                value={formData.securityAnswer}
                                                onChange={handleInputChange}
                                                placeholder="Security Answer *"
                                                required
                                            />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                style={{ padding: '8px', display: 'flex', width:'17px' }}
                                                type="checkbox"
                                                id="agreeToTerms"
                                                name="agreeToTerms"
                                                checked={formData.agreeToTerms}
                                                onChange={handleInputChange} />

                                            <span class="checkmark" style={{ margin: '0px 0px 0px 10px' }}>I agree to the Terms and Conditions</span>
                                        </div>
                                        <IonButton
                                            color='secondary'
                                            type='submit'
                                            expand="full"
                                            style={{ marginTop: '20px', width: '100%', textTransform: 'uppercase' }}
                                            disabled={loading}
                                        >
                                            {loading ? 'Registering...' : 'Register'}
                                        </IonButton>
                                    </form>
                                    <div style={{ justifyContent: 'center', display: 'flex', marginTop: '10px' }}>
                                        Already have an account?{" "}
                                        <span style={{ cursor: "pointer", color: '#bc7700', marginLeft: '5px' }} onClick={() => window.location.href = '/login'}>
                                            Login here
                                        </span>
                                    </div>
                                </div>

                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={2000}
                />
            </IonPage>
        </>
    );
}

export default Register;