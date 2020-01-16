import { TestBed } from '@angular/core/testing';

import { TaskItemService } from './task-item.service';

describe('TaskItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskItemService = TestBed.get(TaskItemService);
    expect(service).toBeTruthy();
  });
});
