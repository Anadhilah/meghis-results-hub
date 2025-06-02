
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2, Save, Shield, Users, Crown, GraduationCap } from 'lucide-react';
import { AdminUser, AdminRole, AdminPermission, Department } from '@/types/school';

const AdminRoles = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'John Administrator',
      email: 'admin@meghis.edu',
      role: 'super_admin',
      permissions: [
        { resource: 'students', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'results', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'departments', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'users', actions: ['create', 'read', 'update', 'delete'] }
      ]
    },
    {
      id: '2',
      name: 'Sarah Academic Head',
      email: 'academic@meghis.edu',
      role: 'academic_admin',
      permissions: [
        { resource: 'students', actions: ['read', 'update'] },
        { resource: 'results', actions: ['create', 'read', 'update'] },
        { resource: 'subjects', actions: ['create', 'read', 'update'] }
      ]
    },
    {
      id: '3',
      name: 'Michael Science Head',
      email: 'science.head@meghis.edu',
      role: 'department_head',
      departmentId: '1',
      permissions: [
        { resource: 'students', actions: ['read'] },
        { resource: 'results', actions: ['read'] },
        { resource: 'department_students', actions: ['read', 'update'] }
      ]
    },
    {
      id: '4',
      name: 'Emily Mathematics Teacher',
      email: 'math.teacher@meghis.edu',
      role: 'teacher',
      assignedSubjects: ['1', '2'],
      permissions: [
        { resource: 'students', actions: ['read'] },
        { resource: 'results', actions: ['create', 'read', 'update'] }
      ]
    }
  ]);

  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const departments: Department[] = [
    { id: '1', name: 'General Science', description: 'Science Department', programs: [] },
    { id: '2', name: 'General Arts', description: 'Arts Department', programs: [] },
    { id: '3', name: 'Business', description: 'Business Department', programs: [] }
  ];

  const availableResources = [
    'students', 'results', 'departments', 'subjects', 'classes', 'users', 'notifications'
  ];

  const availableActions = ['create', 'read', 'update', 'delete'];

  const roleIcons = {
    super_admin: Crown,
    academic_admin: Shield,
    department_head: Users,
    teacher: GraduationCap
  };

  const roleColors = {
    super_admin: 'bg-purple-100 text-purple-800',
    academic_admin: 'bg-blue-100 text-blue-800',
    department_head: 'bg-green-100 text-green-800',
    teacher: 'bg-orange-100 text-orange-800'
  };

  const createNewUser = () => {
    const newUser: AdminUser = {
      id: `user_${Date.now()}`,
      name: '',
      email: '',
      role: 'teacher',
      permissions: []
    };
    setEditingUser(newUser);
    setIsCreateMode(true);
  };

  const editUser = (user: AdminUser) => {
    setEditingUser({ ...user });
    setIsCreateMode(false);
  };

  const saveUser = () => {
    if (!editingUser) return;

    if (isCreateMode) {
      setAdminUsers(prev => [...prev, editingUser]);
    } else {
      setAdminUsers(prev => 
        prev.map(user => user.id === editingUser.id ? editingUser : user)
      );
    }

    setEditingUser(null);
    setIsCreateMode(false);
  };

  const deleteUser = (userId: string) => {
    setAdminUsers(prev => prev.filter(user => user.id !== userId));
  };

  const updatePermission = (resource: string, action: string, checked: boolean) => {
    if (!editingUser) return;

    const updatedPermissions = [...editingUser.permissions];
    const resourceIndex = updatedPermissions.findIndex(p => p.resource === resource);

    if (resourceIndex >= 0) {
      if (checked) {
        if (!updatedPermissions[resourceIndex].actions.includes(action as any)) {
          updatedPermissions[resourceIndex].actions.push(action as any);
        }
      } else {
        updatedPermissions[resourceIndex].actions = updatedPermissions[resourceIndex].actions.filter(a => a !== action);
        if (updatedPermissions[resourceIndex].actions.length === 0) {
          updatedPermissions.splice(resourceIndex, 1);
        }
      }
    } else if (checked) {
      updatedPermissions.push({ resource, actions: [action as any] });
    }

    setEditingUser({ ...editingUser, permissions: updatedPermissions });
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!editingUser) return false;
    const permission = editingUser.permissions.find(p => p.resource === resource);
    return permission?.actions.includes(action as any) || false;
  };

  const applyRoleTemplate = (role: AdminRole) => {
    if (!editingUser) return;

    let permissions: AdminPermission[] = [];

    switch (role) {
      case 'super_admin':
        permissions = availableResources.map(resource => ({
          resource,
          actions: ['create', 'read', 'update', 'delete']
        }));
        break;
      case 'academic_admin':
        permissions = [
          { resource: 'students', actions: ['read', 'update'] },
          { resource: 'results', actions: ['create', 'read', 'update'] },
          { resource: 'subjects', actions: ['create', 'read', 'update'] },
          { resource: 'classes', actions: ['read', 'update'] }
        ];
        break;
      case 'department_head':
        permissions = [
          { resource: 'students', actions: ['read'] },
          { resource: 'results', actions: ['read'] },
          { resource: 'subjects', actions: ['read'] }
        ];
        break;
      case 'teacher':
        permissions = [
          { resource: 'students', actions: ['read'] },
          { resource: 'results', actions: ['create', 'read', 'update'] }
        ];
        break;
    }

    setEditingUser({ ...editingUser, role, permissions });
  };

  const getDepartmentName = (departmentId?: string) => {
    return departments.find(d => d.id === departmentId)?.name || 'N/A';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-meghis-blue">Admin Role Management</h2>
          <p className="text-gray-600">Manage admin users and their access permissions</p>
        </div>
        <Button onClick={createNewUser} className="meghis-gradient text-white">
          <Plus size={16} className="mr-2" />
          Add Admin User
        </Button>
      </div>

      {/* Admin Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>All administrative users and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map(user => {
                const RoleIcon = roleIcons[user.role];
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className={roleColors[user.role]}>
                        <RoleIcon size={12} className="mr-1" />
                        {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </TableCell>
                    <TableCell>{getDepartmentName(user.departmentId)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.slice(0, 2).map(permission => (
                          <Badge key={permission.resource} variant="outline" className="text-xs">
                            {permission.resource}
                          </Badge>
                        ))}
                        {user.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.permissions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => editUser(user)}>
                          <Edit size={14} />
                        </Button>
                        {user.role !== 'super_admin' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit/Create Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreateMode ? 'Create New Admin User' : 'Edit Admin User'}
            </DialogTitle>
            <DialogDescription>
              Configure user details, role, and specific permissions
            </DialogDescription>
          </DialogHeader>
          
          {editingUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    placeholder="user@meghis.edu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Role</Label>
                  <Select 
                    value={editingUser.role} 
                    onValueChange={(value: AdminRole) => applyRoleTemplate(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="academic_admin">Academic Admin</SelectItem>
                      <SelectItem value="department_head">Department Head</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {editingUser.role === 'department_head' && (
                  <div>
                    <Label>Department</Label>
                    <Select 
                      value={editingUser.departmentId || ''} 
                      onValueChange={(value) => setEditingUser({...editingUser, departmentId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-lg">Permissions</Label>
                <p className="text-sm text-gray-500 mb-4">
                  Configure specific permissions for this user
                </p>
                
                <div className="border rounded-lg p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resource</TableHead>
                        <TableHead className="text-center">Create</TableHead>
                        <TableHead className="text-center">Read</TableHead>
                        <TableHead className="text-center">Update</TableHead>
                        <TableHead className="text-center">Delete</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {availableResources.map(resource => (
                        <TableRow key={resource}>
                          <TableCell className="font-medium capitalize">
                            {resource.replace('_', ' ')}
                          </TableCell>
                          {availableActions.map(action => (
                            <TableCell key={action} className="text-center">
                              <Checkbox
                                checked={hasPermission(resource, action)}
                                onCheckedChange={(checked) => 
                                  updatePermission(resource, action, checked as boolean)
                                }
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancel
            </Button>
            <Button onClick={saveUser} className="meghis-gradient text-white">
              <Save size={16} className="mr-2" />
              Save User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRoles;
