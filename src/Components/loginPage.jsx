import React, { useState } from 'react';
import { User, UserCog, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted', { role: selectedRole, email, password });
    
    // Simple validation - replace with your actual login logic
    if (email && password && selectedRole) {
      // Simulate successful login
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userRole', selectedRole);
      
      // Navigate based on role
      switch (selectedRole) {
        case 'Sales Associate':
          navigate('/sales-associate');  // Updated path
          break;
        case 'Administrator':
          navigate('/admin');  // Updated path
          break;
        case 'Headquarters Staff':
          navigate('/headquarters');  // Updated path
          break;
        default:
          console.log('Invalid role selected');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F7F6] to-[#E5E1DD] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-[#614B3B] mb-8">Select Your Role</h2>
        
        <div className="flex justify-around mb-8">
          {[
            { title: 'Sales Associate', icon: User },
            { title: 'Administrator', icon: UserCog },
            { title: 'Headquarters Staff', icon: Users }
          ].map(({ title, icon: Icon }) => (
            <button
              key={title}
              onClick={() => handleRoleSelect(title)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                selectedRole === title 
                  ? 'text-[#614B3B] bg-[#F8F7F6] scale-105 shadow-sm' 
                  : 'text-gray-600 hover:bg-[#F8F7F6] hover:scale-102'
              }`}
            >
              <Icon 
                size={28} 
                className={`transition-transform group-hover:scale-110 ${
                  selectedRole === title ? 'text-[#8B6F5C]' : 'text-gray-600'
                }`}
              />
              <span className="text-sm font-medium whitespace-nowrap">{title}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
                focus:ring-2 focus:ring-[#8B6F5C] focus:border-[#8B6F5C] 
                outline-none transition-all placeholder:text-gray-400"
              required
            />
          </div>
          <div className="space-y-1">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
                focus:ring-2 focus:ring-[#8B6F5C] focus:border-[#8B6F5C] 
                outline-none transition-all placeholder:text-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#614B3B] text-white py-3 rounded-xl font-medium 
              hover:bg-[#725A49] active:bg-[#8B6F5C] transition-colors 
              duration-200 shadow-sm hover:shadow"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;