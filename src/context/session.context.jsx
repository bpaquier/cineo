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

  testApi() {
    fetch('https://bastienpaquier.masselab.com/addFilm.php')
      .then((rep) => rep.json())
      .then((hello) => console.log(hello));
  }

  // SIGN IN TUNED OFF BECAUSE NO MORE BACKEND GESTION

  /* signIn = (mail, password, e) => {
    e.preventDefault();
    let infosUsers = {};
    infosUsers.mail = mail;
    infosUsers.password = password;

    fetch('http://18.191.118.60:80/signIn.php', {
      method: 'POST',
      body: JSON.stringify(infosUsers),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          let userloged = {
            id: data.infos[0].id,
            name: data.infos[0].name,
            lastName: data.infos[0].last_name,
            pseudo: data.infos[0].pseudo,
            mail: data.infos[0].mail,
            signUpDate: data.infos[0].date_inscription,
          };
          this.setState({ user: userloged });
          localStorage.setItem('user', JSON.stringify(userloged));

          let userId = {};
          userId.id = data.infos[0].id;
          fetch('http://18.191.118.60:80/getMoviesList.php', {
            method: 'POST',
            body: JSON.stringify(userId),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              if (data.length > 0) {
                let movieList = [];
                data.forEach((movie) => {
                  movieList.push(movie.id_movie);
                });
                this.setState({ movieList: movieList });
                localStorage.setItem('moviesList', JSON.stringify(movieList));
              }
            });
        } else {
          this.setState({ wrongLogin: true });
        }
      });
  }; */

  signUp = (name, firstName, mail, password, pseudo, e) => {
    e.preventDefault();

    let data = {};

    data.lastName = name;
    data.name = firstName;
    data.mail = mail;
    data.password = password;
    data.pseudo = pseudo;
    data.signUpDate = new Date();
    this.setState({ user: data });
    localStorage.setItem('user', JSON.stringify(data));

    /* fetch('http://18.191.118.60:80/signUp.php', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          this.setState({ mailAlreadyExist: true });
        } else {
          let userLoged = {
            id: data.user[0].id,
            name: data.user[0].name,
            lastName: data.user[0].last_name,
            pseudo: data.user[0].pseudo,
            mail: data.user[0].mail,
            signUpDate: data.user[0].date_inscription,
          };
          this.setState({ user: userLoged });
          localStorage.setItem('user', JSON.stringify(userLoged));
        }
      }); */
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
    let moviesList;
    if (localStorage.getItem('moviesList')) {
      moviesList = [...JSON.parse(localStorage.getItem('moviesList'))];
    } else {
      moviesList = [];
    }

    let newList = [...moviesList, filmId];

    this.setState({ movieList: newList });
    localStorage.setItem('moviesList', JSON.stringify(newList));

    /* let data = {};
    data.idUser = this.state.user.id;
    data.idFilm = filmId.toString();

    fetch('http://18.191.118.60:80/addFilm.php', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let movieList = [];
        data.forEach((movie) => {
          movieList.push(movie.id_movie);
        });
        this.setState({ movieList: movieList });
        localStorage.setItem('moviesList', JSON.stringify(movieList));
      }); */
  };

  deleteMovie = (id_movie) => {
    const moviesList = [...this.state.movieList];
    const index = moviesList.findIndex((el) => el === id_movie);
    moviesList.splice(index, 1);

    this.setState({ movieList: moviesList });
    localStorage.setItem('moviesList', JSON.stringify(moviesList));

    /* let data = {};
    data.movieId = id_movie.toString();
    data.userId = this.state.user.id;

    fetch('http://18.191.118.60:80/deleteMovie.php', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let movieList = [];
        data.forEach((movie) => {
          movieList.push(movie.id_movie);
        });
        this.setState({ movieList: movieList });
        localStorage.setItem('moviesList', JSON.stringify(movieList));
      }); */
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
      testApi: this.testApi,
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
