import React from 'react';
import 'materialize-css/dist/js/materialize';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h3>Searchify App</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            numquam nostrum eius consectetur similique cupiditate. Ipsam magnam
            sunt, itaque maxime repellendus placeat saepe, accusamus quibusdam
            omnis velit autem, animi beatae!
          </p>
          <div className='buttons'>
            <a
              href='#!'
              className='btn indigo darken-1 waves-effect waves-light'
            >
              Sign Up
            </a>
            <a href='#!' className='btn grey darken-2 waves-effect waves-light'>
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
