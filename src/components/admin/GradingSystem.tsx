
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, Settings, Star } from 'lucide-react';
import { GradingSystem as GradingSystemType, GradeScale } from '@/types/school';

const GradingSystem = () => {
  const [gradingSystems, setGradingSystems] = useState<GradingSystemType[]>([
    {
      id: '1',
      name: 'Standard Grading',
      description: 'Traditional A-F grading system',
      isDefault: true,
      gradeScale: [
        { id: '1', grade: 'A', minScore: 80, maxScore: 100, points: 4.0, remark: 'Excellent' },
        { id: '2', grade: 'B', minScore: 70, maxScore: 79, points: 3.0, remark: 'Very Good' },
        { id: '3', grade: 'C', minScore: 60, maxScore: 69, points: 2.0, remark: 'Good' },
        { id: '4', grade: 'D', minScore: 50, maxScore: 59, points: 1.0, remark: 'Fair' },
        { id: '5', grade: 'F', minScore: 0, maxScore: 49, points: 0.0, remark: 'Needs Improvement' }
      ]
    },
    {
      id: '2',
      name: 'Advanced Placement',
      description: 'Enhanced grading for advanced courses',
      isDefault: false,
      gradeScale: [
        { id: '6', grade: 'A+', minScore: 95, maxScore: 100, points: 4.5, remark: 'Outstanding' },
        { id: '7', grade: 'A', minScore: 85, maxScore: 94, points: 4.0, remark: 'Excellent' },
        { id: '8', grade: 'B+', minScore: 75, maxScore: 84, points: 3.5, remark: 'Very Good' },
        { id: '9', grade: 'B', minScore: 65, maxScore: 74, points: 3.0, remark: 'Good' },
        { id: '10', grade: 'C', minScore: 55, maxScore: 64, points: 2.0, remark: 'Fair' },
        { id: '11', grade: 'F', minScore: 0, maxScore: 54, points: 0.0, remark: 'Unsatisfactory' }
      ]
    }
  ]);

  const [editingSystem, setEditingSystem] = useState<GradingSystemType | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const createNewSystem = () => {
    const newSystem: GradingSystemType = {
      id: `system_${Date.now()}`,
      name: '',
      description: '',
      isDefault: false,
      gradeScale: [
        { id: `grade_${Date.now()}_1`, grade: 'A', minScore: 80, maxScore: 100, points: 4.0, remark: 'Excellent' },
        { id: `grade_${Date.now()}_2`, grade: 'B', minScore: 70, maxScore: 79, points: 3.0, remark: 'Very Good' },
        { id: `grade_${Date.now()}_3`, grade: 'C', minScore: 60, maxScore: 69, points: 2.0, remark: 'Good' },
        { id: `grade_${Date.now()}_4`, grade: 'D', minScore: 50, maxScore: 59, points: 1.0, remark: 'Fair' },
        { id: `grade_${Date.now()}_5`, grade: 'F', minScore: 0, maxScore: 49, points: 0.0, remark: 'Needs Improvement' }
      ]
    };
    setEditingSystem(newSystem);
    setIsCreateMode(true);
  };

  const editSystem = (system: GradingSystemType) => {
    setEditingSystem({ ...system });
    setIsCreateMode(false);
  };

  const saveSystem = () => {
    if (!editingSystem) return;

    if (isCreateMode) {
      setGradingSystems(prev => [...prev, editingSystem]);
    } else {
      setGradingSystems(prev => 
        prev.map(system => system.id === editingSystem.id ? editingSystem : system)
      );
    }

    setEditingSystem(null);
    setIsCreateMode(false);
  };

  const setAsDefault = (systemId: string) => {
    setGradingSystems(prev =>
      prev.map(system => ({
        ...system,
        isDefault: system.id === systemId
      }))
    );
  };

  const deleteSystem = (systemId: string) => {
    setGradingSystems(prev => prev.filter(system => system.id !== systemId));
  };

  const addGradeLevel = () => {
    if (!editingSystem) return;
    
    const newGrade: GradeScale = {
      id: `grade_${Date.now()}`,
      grade: '',
      minScore: 0,
      maxScore: 0,
      points: 0,
      remark: ''
    };
    
    setEditingSystem({
      ...editingSystem,
      gradeScale: [...editingSystem.gradeScale, newGrade]
    });
  };

  const updateGradeLevel = (gradeId: string, field: keyof GradeScale, value: string | number) => {
    if (!editingSystem) return;
    
    setEditingSystem({
      ...editingSystem,
      gradeScale: editingSystem.gradeScale.map(grade =>
        grade.id === gradeId ? { ...grade, [field]: value } : grade
      )
    });
  };

  const removeGradeLevel = (gradeId: string) => {
    if (!editingSystem) return;
    
    setEditingSystem({
      ...editingSystem,
      gradeScale: editingSystem.gradeScale.filter(grade => grade.id !== gradeId)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-meghis-blue">Grading System Configuration</h2>
          <p className="text-gray-600">Manage grade boundaries, remarks, and GPA scales</p>
        </div>
        <Button onClick={createNewSystem} className="meghis-gradient text-white">
          <Plus size={16} className="mr-2" />
          Add Grading System
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {gradingSystems.map(system => (
          <Card key={system.id} className="shadow-lg border-0">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-xl text-meghis-blue">{system.name}</CardTitle>
                    {system.isDefault && (
                      <Badge className="bg-meghis-yellow text-white">
                        <Star size={12} className="mr-1" />
                        Default
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{system.description}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => editSystem(system)}>
                    <Edit size={14} />
                  </Button>
                  {!system.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setAsDefault(system.id)}
                      className="text-meghis-yellow"
                    >
                      <Star size={14} />
                    </Button>
                  )}
                  {!system.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600"
                      onClick={() => deleteSystem(system.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {system.gradeScale.map(grade => (
                  <div key={grade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="font-bold min-w-[40px] justify-center">
                        {grade.grade}
                      </Badge>
                      <div className="text-sm">
                        <div className="font-medium">{grade.minScore}-{grade.maxScore}%</div>
                        <div className="text-gray-500">{grade.points} points</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{grade.remark}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={!!editingSystem} onOpenChange={() => setEditingSystem(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreateMode ? 'Create New Grading System' : 'Edit Grading System'}
            </DialogTitle>
            <DialogDescription>
              Configure grade boundaries, points, and remarks for this grading system
            </DialogDescription>
          </DialogHeader>
          
          {editingSystem && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>System Name</Label>
                  <Input
                    value={editingSystem.name}
                    onChange={(e) => setEditingSystem({...editingSystem, name: e.target.value})}
                    placeholder="e.g., Standard Grading"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={editingSystem.description}
                    onChange={(e) => setEditingSystem({...editingSystem, description: e.target.value})}
                    placeholder="Brief description of this grading system"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-lg">Grade Scale</Label>
                  <Button variant="outline" size="sm" onClick={addGradeLevel}>
                    <Plus size={16} className="mr-2" />
                    Add Grade
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Grade</TableHead>
                      <TableHead>Min Score</TableHead>
                      <TableHead>Max Score</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Remark</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editingSystem.gradeScale.map(grade => (
                      <TableRow key={grade.id}>
                        <TableCell>
                          <Input
                            value={grade.grade}
                            onChange={(e) => updateGradeLevel(grade.id, 'grade', e.target.value)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={grade.minScore}
                            onChange={(e) => updateGradeLevel(grade.id, 'minScore', parseInt(e.target.value))}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={grade.maxScore}
                            onChange={(e) => updateGradeLevel(grade.id, 'maxScore', parseInt(e.target.value))}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.1"
                            value={grade.points}
                            onChange={(e) => updateGradeLevel(grade.id, 'points', parseFloat(e.target.value))}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={grade.remark}
                            onChange={(e) => updateGradeLevel(grade.id, 'remark', e.target.value)}
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeGradeLevel(grade.id)}
                            className="text-red-600"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSystem(null)}>
              Cancel
            </Button>
            <Button onClick={saveSystem} className="meghis-gradient text-white">
              <Save size={16} className="mr-2" />
              Save System
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GradingSystem;
