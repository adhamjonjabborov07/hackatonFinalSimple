import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Select } from 'antd';
import axios from 'axios';
import AddItemModal from './AddItemModal';
import 'leaflet/dist/leaflet.css';

const { Option } = Select;

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/items');
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.status === statusFilter));
    }
  }, [statusFilter, items]);

  const handleAddItem = () => {
    setModalVisible(true);
  };

  const handleItemAdded = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div className="home-container p-4">
      <h1 className="text-2xl font-bold mb-4">Lost & Found</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span>Filter by status:</span>
          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 120 }}>
            <Option value="all">All</Option>
            <Option value="lost">Lost</Option>
            <Option value="found">Found</Option>
          </Select>
        </div>
        <Button type="primary" onClick={handleAddItem}>Add Item</Button>
      </div>
      <div className="map-container" style={{ height: '500px', width: '100%' }}>
        <MapContainer center={[41.2995, 69.2401]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {filteredItems.map(item => (
            <Marker key={item.id} position={[item.location.lat, item.location.lng]}>
              <Popup>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Status: {item.status}</p>
                  {item.photo && <img src={item.photo} alt={item.title} style={{ width: '100px' }} />}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <AddItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onItemAdded={handleItemAdded}
      />
    </div>
  );
};

export default Home;
