/**
 * Arquivo: index.tsx
 * Caminho: src/pages/documents/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de documentos principal do sistema, conectada à API via useDocumentsData.
 */

import React, { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, 
  IconButton, Avatar, Chip, LinearProgress, Skeleton,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem,
  List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction
} from '@mui/material';
import {
  Description, Upload, Search, FilterList, MoreVert,
  PictureAsPdf, Image, InsertDriveFile, Delete, Edit,
  Download, Visibility, Folder, Storage, TrendingUp
} from '@mui/icons-material';
import { useDocumentsData } from '@/hooks/useDocumentsData';
import { useMessages } from '@/hooks/useMessages';
import { documentMessages } from '@/i18n/messages/document.messages';

const Documents = () => {
  const { messages } = useMessages(documentMessages);
  const { data, isLoading, isError, uploadDocument, updateDocument, deleteDocument } = useDocumentsData();
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
        <Skeleton variant="text" width={250} height={60} />
        <Skeleton variant="text" width={200} height={30} />
        <Grid container columns={12} spacing={3} mt={2}>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3, mb: 2 }} />
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{messages.error.loadData}</Typography>
      </Box>
    );
  }

  const { documents, recentUploads, categories, storageStats } = data;

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <PictureAsPdf />;
      case 'jpg':
      case 'jpeg':
      case 'png': return <Image />;
      default: return <InsertDriveFile />;
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.name.toLowerCase() === category);
    return cat ? cat.color : '#757575';
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUpload = async (file: File) => {
    try {
      await uploadDocument(file, {
        name: file.name,
        type: file.name.split('.').pop() || 'unknown',
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        category: 'personal',
        status: 'active',
        description: '',
        tags: [],
        url: ''
      });
      setOpenUploadDialog(false);
    } catch (error) {
      console.error('Erro no upload:', error);
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            {messages.header.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {messages.header.subtitle}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Upload />}
          onClick={() => setOpenUploadDialog(true)}
          sx={{ borderRadius: 2 }}
        >
          {messages.header.uploadButton}
        </Button>
      </Box>

      <Grid container columns={12} spacing={3}>
        {/* Lista de Documentos */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              {/* Filtros */}
              <Box display="flex" gap={2} mb={3}>
                <TextField
                  placeholder={messages.filters.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  sx={{ flex: 1 }}
                />
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>{messages.filters.categoryLabel}</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label={messages.filters.categoryLabel}
                  >
                    <MenuItem value="all">{messages.filters.categories.all}</MenuItem>
                    <MenuItem value="personal">{messages.filters.categories.personal}</MenuItem>
                    <MenuItem value="work">{messages.filters.categories.work}</MenuItem>
                    <MenuItem value="medical">{messages.filters.categories.medical}</MenuItem>
                    <MenuItem value="financial">{messages.filters.categories.financial}</MenuItem>
                    <MenuItem value="legal">{messages.filters.categories.legal}</MenuItem>
                    <MenuItem value="other">{messages.filters.categories.other}</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Lista de Documentos */}
              <List>
                {filteredDocuments.map((doc) => (
                  <ListItem
                    key={doc.id}
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      mb: 2,
                      background: 'white',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ background: getCategoryColor(doc.category) }}>
                        {getFileIcon(doc.type)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body1" fontWeight="medium">
                            {doc.name}
                          </Typography>
                          <Chip
                            label={doc.category}
                            size="small"
                            sx={{
                              background: getCategoryColor(doc.category),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {doc.description}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={2} mt={1}>
                            <Typography variant="caption" color="text.secondary">
                              {doc.size} • {doc.uploadDate}
                            </Typography>
                            <Box display="flex" gap={0.5}>
                              {doc.tags.map((tag, index) => (
                                <Chip
                                  key={index}
                                  label={tag}
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box display="flex" gap={1}>
                        <IconButton size="small">
                          <Visibility />
                        </IconButton>
                        <IconButton size="small">
                          <Download />
                        </IconButton>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          {/* Uploads Recentes */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {messages.sidebar.recentUploads.title}
              </Typography>
              {recentUploads.map((doc) => (
                <Box key={doc.id} display="flex" alignItems="center" py={1}>
                  <Avatar sx={{ 
                    background: getCategoryColor(doc.category), 
                    mr: 2, 
                    width: 32, 
                    height: 32 
                  }}>
                    {getFileIcon(doc.type)}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {doc.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {doc.uploadDate}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Categorias */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {messages.sidebar.categories.title}
              </Typography>
              {categories.map((category) => (
                <Box key={category.name} display="flex" justifyContent="space-between" py={1}>
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: category.color,
                        mr: 2
                      }}
                    />
                    <Typography variant="body2">{category.name}</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="bold">
                    {category.count}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Armazenamento */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {messages.sidebar.storage.title}
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Storage sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">
                  {storageStats.used} GB de {storageStats.total} GB
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={storageStats.percentage}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#E3F2FD',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, #2196F3, #21CBF3)'
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" mt={1} display="block">
                {storageStats.percentage}% {messages.sidebar.storage.used}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog de Upload */}
      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{messages.uploadDialog.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <label htmlFor="file-upload">
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleUpload(file);
                  }
                }}
                sx={{ width: '100%' }}
                aria-label={messages.uploadDialog.fileInputLabel}
              />
            </label>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUploadDialog(false)}>{messages.uploadDialog.cancel}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Documents;
