import React from 'react';


const topUsersData = [
  { id: 1, name: "Alice", posts: 10, avatar: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Bob", posts: 8, avatar: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Charlie", posts: 6, avatar: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Diana", posts: 5, avatar: "https://i.pravatar.cc/100?img=4" },
  { id: 5, name: "Ethan", posts: 4, avatar: "https://i.pravatar.cc/100?img=5" },
  { id: 6, name: "Fiona", posts: 3, avatar: "https://i.pravatar.cc/100?img=6" },
];

const TopUsers = () => {
     return (
    <section className="bg-base-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl lg:text-4xl text-primary text-center font-bold my-6">Top Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {topUsersData.map(user => (
            <div
              key={user.id}
              className="bg-secondary text-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:scale-105 transition-all duration-300"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full mb-2"
              />
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm">Posts: {user.posts}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopUsers;