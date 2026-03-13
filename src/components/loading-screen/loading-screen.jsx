import React from 'react';
import UniversalSpinner from '../universal-spinner/universal-spinner';

function LoadingScreen() {  
    return (
        <div className="flex justify-center items-center min-h-screen">
            <UniversalSpinner size="lg" />
        </div>
    );  
}  

export default LoadingScreen;