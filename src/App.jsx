import React, { useState } from 'react';
import { Calendar, Clock, Star, Users, Film, Ticket, ArrowLeft } from 'lucide-react';
import LoginPage from './components/LoginPage';

const movies = [
  {
    id: 1,
    title: "The Dark Knight",
    genre: "Action, Drama",
    duration: "2h 32min",
    rating: 9.0,
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    showtimes: ["10:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"],
    price: 12
  },
  {
    id: 2,
    title: "Inception",
    genre: "Sci-Fi, Thriller",
    duration: "2h 28min",
    rating: 8.8,
    image: "https://images.pexels.com/photos/7991471/pexels-photo-7991471.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    showtimes: ["11:00 AM", "3:00 PM", "7:00 PM", "10:00 PM"],
    price: 14
  },
  {
    id: 3,
    title: "Interstellar",
    genre: "Sci-Fi, Drama",
    duration: "2h 49min",
    rating: 8.6,
    image: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    showtimes: ["1:00 PM", "4:30 PM", "8:00 PM"],
    price: 15
  },
  {
    id: 4,
    title: "Dune",
    genre: "Sci-Fi, Adventure",
    duration: "2h 35min",
    rating: 8.0,
    image: "https://images.pexels.com/photos/7991408/pexels-photo-7991408.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet.",
    showtimes: ["12:00 PM", "3:30 PM", "7:30 PM", "10:30 PM"],
    price: 16
  }
];

const generateSeats = () => {
  const seats = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  for (const row of rows) {
    for (let number = 1; number <= 12; number++) {
      seats.push({
        id: `${row}${number}`,
        row,
        number,
        isBooked: Math.random() > 0.7,
        isSelected: false
      });
    }
  }
  
  return seats;
};

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('movies');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('movies');
    setSelectedMovie(null);
    setSelectedShowtime('');
    setSelectedSeats([]);
    setSeats(generateSeats());
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setCurrentView('booking');
  };

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat && !seat.isBooked) {
      setSeats(prev => prev.map(s => 
        s.id === seatId 
          ? { ...s, isSelected: !s.isSelected }
          : s
      ));
      
      setSelectedSeats(prev => 
        prev.includes(seatId)
          ? prev.filter(id => id !== seatId)
          : [...prev, seatId]
      );
    }
  };

  const handleBooking = () => {
    if (selectedSeats.length > 0) {
      alert(`Booking confirmed! ${selectedSeats.length} seats booked for ${selectedMovie?.title}`);
      setSeats(prev => prev.map(s => 
        selectedSeats.includes(s.id)
          ? { ...s, isBooked: true, isSelected: false }
          : s
      ));
      setSelectedSeats([]);
    }
  };

  const totalPrice = selectedSeats.length * (selectedMovie?.price || 0);

  // Show login page if user is not logged in
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {currentView === 'movies' ? (
        <div className="container mx-auto px-4 py-8">
          {/* Header with User Info */}
          <div className="flex justify-between items-center mb-8">
            <div></div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-semibold">Welcome, {user.name}!</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg transition-colors border border-gray-600/50"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CineMax
            </h1>
            <p className="text-gray-300 text-xl">Book your favorite movies now</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <div 
                key={movie.id}
                className="bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-700/50"
                onClick={() => handleMovieSelect(movie)}
              >
                <div className="relative">
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {movie.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                  <p className="text-purple-300 mb-3">{movie.genre}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {movie.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Ticket className="w-4 h-4" />
                      ${movie.price}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {movie.description}
                  </p>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Header with User Info */}
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-semibold">Welcome, {user.name}!</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg transition-colors border border-gray-600/50"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mb-8">
            <button 
              onClick={() => setCurrentView('movies')}
              className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Movies
            </button>
            
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-gray-700/50">
              <div className="flex flex-col lg:flex-row gap-6">
                <img 
                  src={selectedMovie?.image} 
                  alt={selectedMovie?.title}
                  className="w-full lg:w-48 h-64 object-cover rounded-xl"
                />
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedMovie?.title}</h2>
                  <p className="text-purple-300 mb-4">{selectedMovie?.genre}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedMovie?.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {selectedMovie?.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Ticket className="w-4 h-4" />
                      ${selectedMovie?.price}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{selectedMovie?.description}</p>
                  
                  <div>
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Select Showtime
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedMovie?.showtimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedShowtime(time)}
                          className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                            selectedShowtime === time
                              ? 'bg-purple-600 border-purple-600 text-white'
                              : 'border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedShowtime && (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Select Your Seats
              </h3>
              
              <div className="mb-6">
                <div className="w-full h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
                    SCREEN
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-2 mb-6 max-w-4xl mx-auto">
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={seat.isBooked}
                    className={`aspect-square text-xs font-semibold rounded-lg transition-all duration-300 ${
                      seat.isBooked
                        ? 'bg-red-500 text-white cursor-not-allowed'
                        : seat.isSelected
                        ? 'bg-purple-600 text-white transform scale-110 shadow-lg shadow-purple-500/50'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    }`}
                  >
                    {seat.id}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-center gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-700 rounded"></div>
                  <span className="text-gray-300">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-600 rounded"></div>
                  <span className="text-gray-300">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-300">Booked</span>
                </div>
              </div>
              
              {selectedSeats.length > 0 && (
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div>
                      <h4 className="text-white font-semibold">Booking for {user.name}:</h4>
                      <p className="text-purple-300">{selectedSeats.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-300">Total: {selectedSeats.length} seats</p>
                      <p className="text-2xl font-bold text-white">${totalPrice}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleBooking}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 text-lg"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;