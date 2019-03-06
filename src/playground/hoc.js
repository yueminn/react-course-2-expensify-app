import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            <p>This is private info, plz don't share!</p>
            <WrappedComponent {...props}/> {/*Most common way to pass down props*/}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);

//requireAuthentication
const requireAuthenication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated && <p>this is authenticated!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
}
const AuthInfo = requireAuthenication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={true} info="This is the details"/>, document.getElementById('app'));