use migreni_db;

replace into categories
	(id, name)
values
	(1, 'Pain Relief'),
    (2, 'Triptans'),
    (3, 'Ergots'),
    (4, 'Anti-Nausea Medications'),
    (5, 'Opioid Medications'),
    (6, 'Glucocorticoids'),
    (7, 'Cardiovascular Drugs'),
    (8, 'Tricyclic Antidepressants'),
    (9, 'Anti-Seizure Drugs'),
    (10, 'Herbs, Vitamins and Minerals'),
    (11, 'Alternative');

replace into treatments 
	(id, name, acute, CategoryId)
VALUES
	(1, 'Aspirin', true, 1),
    (2, 'Ibuprofen', true, 1),
    (3, 'Propranolol', false, 7),
    (4, 'Valproate', false, 9),
	(5, 'Acetaminophen', true, 1),
	(6, 'Excedrin Migraine', true, 1),
	(7, 'Sumatriptan', true, 2),
	(8,'Rizatriptan', true, 2),
	(9, 'Zolmitriptan', true, 2),
	(10, 'Ergotamine', true, 3),
	(11, 'Chlorpromazine', true, 4),
	(12, 'Codeine', true, 5),
	(13, 'Prednisone', true, 6),
	(14, 'Amitriptyline', false, 8),
	(15, 'Riboflavin (Vitamin B-2)', false, 10),
	(16, 'Massage Therapy', false, 11);
    
replace into doses
	(id, value, unit, TreatmentId)
VALUES
	(1, 2, "500 mg tablet", 5),
    (2, 2, "200 mg capsule", 2);