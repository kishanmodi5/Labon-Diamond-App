import React, { useState } from 'react';
import {
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';


function apps() {
    return (
        <>
            <IonReactRouter>
                <IonTabs id="main-content">
                    <IonTabBar slot="bottom" color='secondary'>
                        <IonTabButton tab="home" href="/home" size='small' >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#FFDEB3" className="bi bi-house-door" viewBox="0 0 16 16">
                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                            </svg>
                        </IonTabButton>
                        <IonTabButton tab="search" href="/search" size='small'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#FFDEB3" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </IonTabButton>
                        <IonTabButton tab="library" href="/wishlist" size='small'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#FFDEB3" className="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                            <span className="count-shop">2</span>
                        </IonTabButton>
                        <IonTabButton tab="radio" href="/addtocard" size='small'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#FFDEB3" className="bi bi-cart3" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                            <span className="count-shop">2</span>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter  >
        </>
    );
}

export default apps; 