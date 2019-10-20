import React from 'react';

import { withRouter } from 'react-router-dom';
import './GoogleMap.scss';

export class MyGooglemap extends React.Component {
  render() {
    return (
      // <Map
      //   google={this.props.google}
      //   style={{
      //     width: '100%',
      //     height: 'auto',
      //     border: '1px solid #A5A5A5',
      //     'border-radius': '2rem',
      //   }}
      //   initialCenter={{
      //     lat: 25.0571884,
      //     lng: 121.5311721,
      //   }}
      //   zoom={15}
      //   onClick={this.onMapClicked}
      // >
      //   <Marker onClick={this.onMarkerClick} name={'Current location'} />

      //   <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
      // </Map>
      <>
        <div className="googleMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.558512438269!2d121.51592121537902!3d25.04905244384115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a96d748b7e1b%3A0xa9fafd4eec67160d!2z5Lqs56uZ5pmC5bCa5buj5aC0IFEgU3F1YXJl!5e0!3m2!1szh-TW!2stw!4v1571154693597!5m2!1szh-TW!2stw"
            frameBorder="0"
            allowFullScreen=""
            title="This is a unique title"
          ></iframe>
        </div>
      </>
    );
  }
}

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyBsLRN1TmnZxtM6YRN1IrgBOuVBC2mKIy8',
// })(MyGooglemap);

export default withRouter(MyGooglemap);
