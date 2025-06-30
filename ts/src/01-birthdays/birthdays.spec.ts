import { BirthdayNotebook } from "./birthdays";

describe("BirthdayNotebook", () => {
  let notebook: BirthdayNotebook;
  
  beforeEach(() => {
    notebook = new BirthdayNotebook();
  });

  it("should return empty array when no birthday is set", () => {
    expect(notebook.getBirthdays(new Date())).toHaveLength(0);
  });

  it("should add a birthday and retrieve it", () => {
    const date = new Date('1990-01-01');
    notebook.addBirthday('John Doe', date);
    
    const result = notebook.getBirthdays(date);
    
    
    expect(result).toContain('John Doe');
    expect(result).toHaveLength(1);
  });

  it("should handle multiple birthdays on the same date", () => {
    const date = new Date('1990-01-01');
    notebook
      .addBirthday('John Doe', date)
      .addBirthday('Jane Smith', date);
    
    const result = notebook.getBirthdays(date);
    
    expect(result[0]).toBe('John Doe');   // BOITE BLANCHE
    expect(result[1]).toBe('Jane Smith'); // BOITE BLANCHE

    expect(result).toContain('John Doe'); // BOITE NOIRE <=-- GOOD!
    expect(result).toContain('Jane Smith'); // BOITE NOIRE
    expect(result).toHaveLength(2);
  });

  it("should not mix up different dates", () => {
    const date1 = new Date('1990-01-01');
    const date2 = new Date('1990-02-01');
    
    notebook
      .addBirthday('John Doe', date1)
      .addBirthday('Jane Smith', date2);
    
    const result1 = notebook.getBirthdays(date1);
    const result2 = notebook.getBirthdays(date2);
    
    expect(result1).toContain('John Doe');
    expect(result1).not.toContain('Jane Smith');
    expect(result2).toContain('Jane Smith');
    expect(result2).not.toContain('John Doe');
  });

  it("should handle the same date across different years", () => {
    const date1 = new Date('1990-01-01');
    const date2 = new Date('1991-01-01');
    
    notebook
      .addBirthday('John Doe', date1)
      .addBirthday('Jane Smith', date2);
    
    const result = notebook.getBirthdays(date1);
    
    expect(result).toContain('John Doe');
    expect(result).toContain('Jane Smith');
    expect(result).toHaveLength(2);
  });
});