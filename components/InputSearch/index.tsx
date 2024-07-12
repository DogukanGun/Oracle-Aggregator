'use client';

import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { searchbarActions } from '@/store/actions';
import TextField from '../Form/TextField';
import { usePathname } from 'next/navigation';

export default function InputSearch() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const placeholder = useMemo(() => {
    let base = '';
    return base ? `Search ${base}` : false;
  }, [pathname]);

  const onChange = (text: string) => {
    dispatch(searchbarActions.textChange({ text: text }));
  };

  return placeholder ? (
    <TextField
      icon={faSearch}
      inputProps={{ placeholder }}
      onTextChange={onChange}
      rounded
    />
  ) : (
    <></>
  );
}
