import React, { createContext, Component } from 'react';

const SessionContext = createContext({});

export class SessionContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      mailAlreadyExist: false,
      wrongLogin: false,
      movieList: null,
      isNewMailValid: true,
      apUrl: 'https://bastienpaquier.masselab.com',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({ user: JSON.parse(localStorage.getItem('user')) });
    }
    if (localStorage.getItem('moviesList')) {
      this.setState({
        movieList: JSON.parse(localStorage.getItem('moviesList')),
      });
    }
  }

  connectionToApi = (file, data) => {
    return fetch(`${this.state.apUrl}${file}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((rep) => rep.json());
  };

  signIn = (mail, password, e) => {
    e.preventDefault();

    let infosUsers = {};
    infosUsers.mail = mail;
    infosUsers.password = password;

    this.connectionToApi('/signIn.php', infosUsers).then((data) => {
      if (data.success) {
        let userLoged = { ...data.user };

        this.setState({ user: userLoged });
        localStorage.setItem('user', JSON.stringify(userLoged));

        //get favorite movies
        let userId = {};
        userId.id = data.user.id;
        this.connectionToApi('/getMoviesList.php', userId).then((data) => {
          console.log(data);
          if (data.movies) {
            let movieList = [];
            data.movies.forEach((movie) => {
              movieList.push(parseInt(movie.id_movie));
            });
            this.setState({ movieList: movieList });
            localStorage.setItem('moviesList', JSON.stringify(movieList));
          }
        });
      } else {
        this.setState({ wrongLogin: true });
      }
    });
  };

  signUp = (lastName, firstName, mail, password, pseudo, e) => {
    e.preventDefault();

    let data = {};

    data.lastName = lastName;
    data.firstName = firstName;
    data.mail = mail;
    data.password = password;
    data.pseudo = pseudo;

    this.connectionToApi('/signUp.php', data).then((data) => {
      if (data.mailExist) {
        this.setState({ mailAlreadyExist: true });
      } else {
        let userLoged = { ...data.user };
        this.setState({ user: userLoged });
        localStorage.setItem('user', JSON.stringify(userLoged));
      }
    });
  };

  changeWarningStates = () => {
    this.setState({ mailAlreadyExist: false, wrongLogin: false });
  };

  deleteUser = () => {
    this.setState({ user: null, movieList: null });
    localStorage.removeItem('user');
    localStorage.removeItem('moviesList');

    /* let data = {};
    data.mail = this.state.user.mail;

    fetch('http://18.191.118.60:80/deleteUser.php', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ user: null });
        localStorage.removeItem('user');
        localStorage.removeItem('moviesList');
      }); */
  };

  logOut = () => {
    this.setState({ user: null, movieList: null });
    localStorage.removeItem('user');
    localStorage.removeItem('moviesList');
  };

  addMovie = (filmId) => {
    let data = {};
    data.idUser = this.state.user.id;
    data.idMovie = filmId;

    this.connectionToApi('/addMovie.php', data).then((data) => {
      let movieList = [];
      data.movies.forEach((movie) => {
        movieList.push(parseInt(movie.id_movie));
      });
      this.setState({ movieList: movieList });
      localStorage.setItem('moviesList', JSON.stringify(movieList));
    });
  };

  deleteMovie = (id_movie) => {
    /* const moviesList = [...this.state.movieList];
    const index = moviesList.findIndex((el) => el === id_movie);
    moviesList.splice(index, 1);

    this.setState({ movieList: moviesList });
    localStorage.setItem('moviesList', JSON.stringify(moviesList));
 */
    let data = {};
    data.movieId = id_movie;
    data.userId = this.state.user.id;
    this.connectionToApi('/deleteMovie.php', data).then((data) => {
      console.log(data);
      let movieList = [];
      if (data.movies !== null) {
        data.movies.forEach((movie) => {
          movieList.push(parseInt(movie.id_movie));
        });
      }
      this.setState({ movieList: movieList });
      localStorage.setItem('moviesList', JSON.stringify(movieList));
    });
  };

  changePseudo = (pseudo) => {
    const initialUser = JSON.parse(localStorage.getItem('user'));
    initialUser.pseudo = pseudo;

    localStorage.setItem('user', JSON.stringify(initialUser));
    this.setState({ user: initialUser });
    /* let data = {};
    data.id = this.state.user.id;
    data.value = pseudo;

    fetch('http://18.191.118.60:80/changePseudo.php', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let userLoged = {
          id: data[0].id,
          name: data[0].name,
          lastName: data[0].last_name,
          pseudo: data[0].pseudo,
          mail: data[0].mail,
          signUpDate: data[0].date_inscription,
        };
        this.setState({ user: userLoged });
        localStorage.setItem('user', JSON.stringify(userLoged));
      }); */
  };

  changeLastName = (lastName) => {
    const initialUser = JSON.parse(localStorage.getItem('user'));
    initialUser.lastName = lastName;

    localStorage.setItem('user', JSON.stringify(initialUser));
    this.setState({ user: initialUser });
    /* let data = {};
    data.id = this.state.user.id;
    data.value = lastName;

    fetch('http://18.191.118.60:80/changeLastName.php', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let userLoged = {
          id: data[0].id,
          name: data[0].name,
          lastName: data[0].last_name,
          pseudo: data[0].pseudo,
          mail: data[0].mail,
          signUpDate: data[0].date_inscription,
        };
        this.setState({ user: userLoged });
        localStorage.setItem('user', JSON.stringify(userLoged));
      }); */
  };

  changeFirstName = (firstName) => {
    const initialUser = JSON.parse(localStorage.getItem('user'));
    initialUser.name = firstName;

    localStorage.setItem('user', JSON.stringify(initialUser));
    this.setState({ user: initialUser });
    /* let data = {};
    data.id = this.state.user.id;
    data.value = firstName;

    fetch('http://18.191.118.60:80/changeFirstName.php', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let userLoged = {
          id: data[0].id,
          name: data[0].name,
          lastName: data[0].last_name,
          pseudo: data[0].pseudo,
          mail: data[0].mail,
          signUpDate: data[0].date_inscription,
        };
        this.setState({ user: userLoged });
        localStorage.setItem('user', JSON.stringify(userLoged));
      }); */
  };

  changeMail = (mail) => {
    const initialUser = JSON.parse(localStorage.getItem('user'));
    initialUser.mail = mail;

    if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/i.test(mail)) {
      localStorage.setItem('user', JSON.stringify(initialUser));
      this.setState({ user: initialUser });

      this.setState({ isNewMailValid: true });
    } else {
      this.setState({ isNewMailValid: false });
    }
    /* let data = {};
    data.id = this.state.user.id;
    data.value = mail;

    fetch('http://18.191.118.60:80/changeMail.php', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let userLoged = {
          id: data[0].id,
          name: data[0].name,
          lastName: data[0].last_name,
          pseudo: data[0].pseudo,
          mail: data[0].mail,
          signUpDate: data[0].date_inscription,
        };
        this.setState({ user: userLoged });
        localStorage.setItem('user', JSON.stringify(userLoged));
      }); */
  };

  render() {
    const value = {
      ...this.state,
      signIn: this.signIn,
      signUp: this.signUp,
      changeWarningStates: this.changeWarningStates,
      deleteUser: this.deleteUser,
      logOut: this.logOut,
      addMovie: this.addMovie,
      deleteMovie: this.deleteMovie,
      changePseudo: this.changePseudo,
      changeLastName: this.changeLastName,
      changeFirstName: this.changeFirstName,
      changeMail: this.changeMail,
    };

    return (
      <SessionContext.Provider value={value}>
        {this.props.children}
      </SessionContext.Provider>
    );
  }
}

export const SessionContextConsumer = SessionContext.Consumer;
