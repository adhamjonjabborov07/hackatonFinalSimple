import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const { Option } = Select;
const { TextArea } = Input;

// Компонент для выбора локации
const LocationSelector = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const AddItemModal = ({ visible, onClose, onItemAdded }) => {
  const { control, handleSubmit, reset, setValue } = useForm();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const onSubmit = async (data) => {
    if (!selectedLocation) {
      alert('Please select a location on the map');
      return;
    }

    const newItem = {
      ...data,
      location: { lat: selectedLocation.lat, lng: selectedLocation.lng },
      id: Date.now(),
    };

    try {
      await axios.post('http://localhost:3001/items', newItem);
      onItemAdded(newItem);
      reset();
      setSelectedLocation(null);
      onClose();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleLocationSelect = (latlng) => {
    setSelectedLocation(latlng);
    setValue('location', `${latlng.lat}, ${latlng.lng}`);
  };

  return (
    <Modal
      title="Add New Item"
      open={visible}
      onCancel={() => {
        reset();
        setSelectedLocation(null);
        onClose();
      }}
      footer={null}
      width={800}
      destroyOnHidden={true} // Антидот для React-Leaflet: карта будет размонтироваться
    >
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item label="Title" required>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Description" required>
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => <TextArea {...field} rows={3} />}
          />
        </Form.Item>

        <Form.Item label="Photo URL" required>
          <Controller
            name="photo"
            control={control}
            rules={{ required: 'Photo URL is required' }}
            render={({ field }) => <Input {...field} placeholder="https://example.com/photo.jpg" />}
          />
        </Form.Item>

        <Form.Item label="Status" required>
          <Controller
            name="status"
            control={control}
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <Select {...field}>
                <Option value="lost">Lost</Option>
                <Option value="found">Found</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item label="Category">
          <Controller
            name="category"
            control={control}
            render={({ field }) => <Input {...field} placeholder="e.g., Electronics, Keys" />}
          />
        </Form.Item>

        <Form.Item label="Location (Click on map to select)">
          {visible && (
            <MapContainer
              key={Date.now()} // уникальный ключ при каждом открытии
              center={[41.2995, 69.2401]}
              zoom={13}
              style={{ height: '200px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <LocationSelector onLocationSelect={handleLocationSelect} />
            </MapContainer>
          )}
          {selectedLocation && (
            <p>
              Selected: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
            </p>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Item
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddItemModal;
