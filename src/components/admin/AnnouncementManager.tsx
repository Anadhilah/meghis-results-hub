
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Send, Bell, Users, Calendar } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'general' | 'result_published' | 'urgent' | 'event';
  targetAudience: 'all_students' | 'specific_class' | 'parents';
  classIds?: string[];
  createdAt: string;
  status: 'draft' | 'published';
  createdBy: string;
}

const AnnouncementManager = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Semester Results Published',
      message: 'The results for Semester 2 are now available. Students can log in to view their results.',
      type: 'result_published',
      targetAudience: 'all_students',
      createdAt: '2024-01-15',
      status: 'published',
      createdBy: 'Admin'
    },
    {
      id: '2',
      title: 'Parent-Teacher Meeting',
      message: 'Parent-teacher meetings scheduled for next week. Please check the schedule.',
      type: 'event',
      targetAudience: 'parents',
      createdAt: '2024-01-14',
      status: 'published',
      createdBy: 'Admin'
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    type: 'general' as const,
    targetAudience: 'all_students' as const
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'result_published': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.message) return;

    const announcement: Announcement = {
      id: Date.now().toString(),
      ...newAnnouncement,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'published',
      createdBy: 'Current Admin'
    };

    setAnnouncements(prev => [announcement, ...prev]);
    setNewAnnouncement({
      title: '',
      message: '',
      type: 'general',
      targetAudience: 'all_students'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-meghis-blue">Announcements</h2>
          <p className="text-gray-600">Create and manage school announcements</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="meghis-gradient text-white">
              <Plus size={16} className="mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Send announcements to students and parents
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter announcement message"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <Select
                    value={newAnnouncement.type}
                    onValueChange={(value: any) => setNewAnnouncement(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="result_published">Result Published</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Target Audience</label>
                  <Select
                    value={newAnnouncement.targetAudience}
                    onValueChange={(value: any) => setNewAnnouncement(prev => ({ ...prev, targetAudience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_students">All Students</SelectItem>
                      <SelectItem value="specific_class">Specific Class</SelectItem>
                      <SelectItem value="parents">Parents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleCreateAnnouncement} className="w-full meghis-gradient text-white">
                <Send size={16} className="mr-2" />
                Send Announcement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
          <CardDescription>Manage and track announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map(announcement => (
              <div key={announcement.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{announcement.title}</h3>
                  <div className="flex gap-2">
                    <Badge className={getTypeColor(announcement.type)}>
                      {announcement.type.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline">
                      {announcement.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{announcement.message}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {announcement.targetAudience.replace('_', ' ')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {announcement.createdAt}
                    </span>
                  </div>
                  <span>By {announcement.createdBy}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementManager;
