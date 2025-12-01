import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Plus, Edit, Trash2 } from 'lucide-react';
import { useManualReviews } from '@/hooks/useReviews';

const ReviewManagement: React.FC = () => {
  const { reviews, loading, error, addReview, updateReview, deleteReview } = useManualReviews();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateReview(editingId, formData);
        setEditingId(null);
      } else {
        await addReview(formData);
      }
      setFormData({ name: '', rating: 5, comment: '' });
      setIsAdding(false);
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  const handleEdit = (review: any) => {
    setFormData({
      name: review.name,
      rating: review.rating,
      comment: review.comment,
    });
    setEditingId(review.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData({ name: '', rating: 5, comment: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(id);
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading reviews...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif italic">Review Management</h1>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Review
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Review' : 'Add New Review'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="rating">Rating</Label>
                <div className="flex items-center gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className={`p-1 ${
                        rating <= formData.rating ? 'text-accent' : 'text-muted'
                      }`}
                    >
                      <Star size={24} className={rating <= formData.rating ? 'fill-current' : ''} />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="comment">Review Comment</Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? 'Update Review' : 'Add Review'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'fill-accent text-accent' : 'text-muted'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review.date ? new Date(review.date).toLocaleDateString() : 'No date'}
                    </span>
                  </div>
                  <p className="text-foreground italic mb-2">"{review.comment}"</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Source: {review.source || 'manual'}</span>
                    {review.verified && <span>• Verified</span>}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(review)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(review.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {reviews.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No reviews found. Add your first review to get started.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;
